import { json } from '@sveltejs/kit';
import { GEMINI_API_KEY } from '$env/static/private';

const MODEL = 'gemini-2.5-flash';

export async function POST({ request }) {
    try {
        const form = await request.formData();

        const message = String(form.get('message') ?? '');

        const files = form
            .getAll('files')
            .filter((f): f is File => f instanceof File);

        if (!message && files.length === 0) {
            return json(
                { error: 'Adj meg üzenetet vagy tölts fel fájlt.' },
                { status: 400 }
            );
        }

        const parts: unknown[] = [];

        // system prompt + user text
        if (message) {
            parts.push({
                text: `
Te egy magyar nyelvű, türelmes, de szakmai C# programozási mentor vagy.

Fő célod:
- C# programozási tételek magyarázata
- algoritmusok lényegének érthető bemutatása
- kezdő/középhaladó diákok segítése
- vizsga- és érettségi jellegű feladatok megoldása
- fájlkezelés, tömbök, listák, stringek, ciklusok, függvények, osztályok magyarázata

Válaszolási szabályok:
1. Mindig magyarul válaszolj.
2. Röviden, de érthetően magyarázz.
3. Először mondd el az algoritmus lényegét.
4. Utána adj C# példakódot.
5. A C# kód legyen egyszerű, konzolos alkalmazáshoz illő.
6. A Main() függvény legyen rövid.
7. Minden nagyobb logikát külön függvénybe szervezz ki a Main() függvényen kívül.
8. Ne írj mindent a Main()-be.
9. Használj beszédes magyar vagy angol változóneveket.
10. Ha lehet, adj rövid példabemenetet és példakimenetet.
11. Ha a felhasználó hibás kódot küld, először mondd el a hibát, majd javítsd.
12. Ha fájlt vagy képet kapcsz, elemezd annak tartalmát, és arra válaszolj.
13. Ne adj túl hosszú elméleti választ, inkább kód-fókuszú legyél.

C# kódstílus:
- Használj külön static függvényeket a Main() alatt vagy felett.
- Például:
  - Beolvas()
  - Kiir()
  - Osszeg()
  - MaximumKereses()
  - Eldontes()
  - Megszamlalas()
  - Kivalogatas()
  - LinearisKereses()
  - Rendez()
- A Main() csak irányítsa a programot.
- Console.ReadLine(), Console.WriteLine() használható.
- Ne használj feleslegesen bonyolult LINQ megoldásokat kezdő feladatoknál.
- Ha algoritmusról van szó, mutasd be ciklussal is.

Fontos programozási tételek, amelyeket ismerned kell:
- összegzés tétele
- megszámlálás tétele
- maximumkeresés
- minimumkeresés
- eldöntés tétele
- kiválasztás tétele
- lineáris keresés
- kiválogatás
- szétválogatás
- metszet
- unió
- rendezések alapjai
- fájlbeolvasás
- fájlba írás
- string feldolgozás
- tömb és lista kezelés

Válaszformátum:
1. Rövid magyarázat
2. Algoritmus lényege
3. C# kód
4. Rövid megjegyzés / gyakori hiba

Felhasználó üzenete:
${message}
`
            });
        }

        // MULTIPLE FILES / IMAGES
        for (const file of files) {
            // opcionális méretlimit (Vercel miatt ajánlott)
            if (file.size > 4 * 1024 * 1024) {
                return json(
                    {
                        error: `${file.name} túl nagy. Maximum 4MB ajánlott Vercelen.`
                    },
                    { status: 400 }
                );
            }

            const buffer = Buffer.from(await file.arrayBuffer());

            parts.push({
                inline_data: {
                    mime_type: file.type,
                    data: buffer.toString('base64')
                }
            });
        }

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: 'user',
                            parts
                        }
                    ]
                })
            }
        );

        const data = await geminiResponse.json();

        if (!geminiResponse.ok) {
            console.error(data);

            return json(
                {
                    error: data.error?.message ?? 'Gemini API hiba'
                },
                {
                    status: geminiResponse.status
                }
            );
        }

        const answer =
            data.candidates?.[0]?.content?.parts?.[0]?.text ??
            'Nem érkezett válasz.';

        return json({
            answer
        });
    } catch (err) {
        console.error(err);

        return json(
            {
                error: 'Szerverhiba.'
            },
            {
                status: 500
            }
        );
    }
}