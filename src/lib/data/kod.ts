export type KodItem = {
	id: number;
	category: string;
	title: string;
	description: string;
	code: string;
};

export const kodItems: KodItem[] = [
	{
		id: 1,
		category: 'Alap',
		title: 'using + Program + Random',
		description: 'A program alapja: névterek, Program osztály és közös véletlenszám-generátor.',
		code: `using System;
using System.Text;

class Program
{
    static Random veletlen = new Random();

    // Main és alprogramok
}`
	},
	{
		id: 2,
		category: 'Main',
		title: 'Main()',
		description: 'A Main() csak vezérli a programot: adatokat készít, meghívja az alprogramokat, majd kiírja az eredményeket.',
		code: `static void Main()
{
    Console.OutputEncoding = Encoding.UTF8;

    int[] robotika = GeneralKulonbozoLista(20, 1, 100);
    int[] sport = GeneralKulonbozoLista(18, 1, 100);
    int[] matek = GeneralKulonbozoLista(15, 1, 100);
    int[] pontok = GeneralPontok(30, 0, 100);

    Console.WriteLine("1. ADATGENERÁLÁS");
    KiirLista("Robotika", robotika);
    KiirLista("Sport", sport);
    KiirLista("Matek", matek);
    KiirLista("Pontok", pontok);

    Console.WriteLine();

    Console.WriteLine("2. UNIÓ");
    int[] unio = Unio(robotika, sport);
    KiirLista("Robotika és sport uniója", unio);

    Console.WriteLine();

    Console.WriteLine("3. METSZET");
    int[] metszet = Metszet(robotika, matek);
    KiirLista("Robotika és matek metszete", metszet);

    Console.WriteLine();

    Console.WriteLine("4. KIVÁLASZTÁS");
    int hely;
    int ertek;

    if (KivalasztElsoLegalabb90(pontok, out hely, out ertek))
    {
        Console.WriteLine("Az első legalább 90 pontos eredmény helye: " + hely);
        Console.WriteLine("Az első legalább 90 pontos eredmény értéke: " + ertek);
    }
    else
    {
        Console.WriteLine("Nincs legalább 90 pontos eredmény.");
    }

    Console.WriteLine();

    Console.WriteLine("5. ELDÖNTÉS");
    if (TartalmazE(pontok, 100))
    {
        Console.WriteLine("Van 100 pontos eredmény.");
    }
    else
    {
        Console.WriteLine("Nincs 100 pontos eredmény.");
    }

    Console.WriteLine();

    Console.WriteLine("6. KERESÉS");
    int keresettHely;

    if (Keres(pontok, 75, out keresettHely))
    {
        Console.WriteLine("A 75 szerepel a pontok listában. Helye: " + keresettHely);
    }
    else
    {
        Console.WriteLine("A 75 nem szerepel a pontok listában.");
    }

    Console.WriteLine();

    Console.WriteLine("7. KIVÁLOGATÁS");
    int[] legalabb60 = KivalogatLegalabb60(pontok);
    KiirLista("Legalább 60 pontos eredmények", legalabb60);

    Console.WriteLine();

    Console.WriteLine("8. MEGSZÁMLÁLÁS");
    int kisebbMint50Db = MegszamolKisebbMint50(pontok);
    Console.WriteLine("Az 50-nél kisebb pontszámok száma: " + kisebbMint50Db);

    Console.WriteLine();

    Console.WriteLine("9. ÖSSZEFUTTATÁS");

    int[] rendezettRobotika = Masolat(robotika);
    int[] rendezettSport = Masolat(sport);

    BuborekosRendezes(rendezettRobotika);
    BuborekosRendezes(rendezettSport);

    KiirLista("Rendezett robotika lista", rendezettRobotika);
    KiirLista("Rendezett sport lista", rendezettSport);

    int[] osszefuttatott = Osszefuttat(rendezettRobotika, rendezettSport);
    KiirLista("Összefuttatott rendezett lista", osszefuttatott);

    Console.WriteLine();

    Console.WriteLine("10. TOP KIVÁLASZTÁS");
    int[] top3 = Top3Legnagyobb(pontok);
    KiirLista("A három legnagyobb pontszám", top3);
}`
	},
	{
		id: 3,
		category: 'Generálás',
		title: 'GeneralKulonbozoLista()',
		description: 'Adott darabszámú, egymástól különböző véletlen számot generál.',
		code: `static int[] GeneralKulonbozoLista(int darab, int minimum, int maximum)
{
    int[] lista = new int[darab];
    int db = 0;

    while (db < darab)
    {
        int ujSzam = veletlen.Next(minimum, maximum + 1);

        if (!TartalmazE(lista, db, ujSzam))
        {
            lista[db] = ujSzam;
            db++;
        }
    }

    return lista;
}`
	},
	{
		id: 4,
		category: 'Generálás',
		title: 'GeneralPontok()',
		description: 'Véletlen pontszámokat generál. Itt nem kell különbözőséget ellenőrizni.',
		code: `static int[] GeneralPontok(int darab, int minimum, int maximum)
{
    int[] pontok = new int[darab];

    for (int i = 0; i < pontok.Length; i++)
    {
        pontok[i] = veletlen.Next(minimum, maximum + 1);
    }

    return pontok;
}`
	},
	{
		id: 5,
		category: 'Eldöntés',
		title: 'TartalmazE() — teljes tömb',
		description: 'Eldönti, hogy egy érték szerepel-e a teljes tömbben.',
		code: `static bool TartalmazE(int[] lista, int ertek)
{
    int i = 0;

    while (i < lista.Length && lista[i] != ertek)
    {
        i++;
    }

    return i < lista.Length;
}`
	},
	{
		id: 6,
		category: 'Eldöntés',
		title: 'TartalmazE() — részleges tömb',
		description: 'Csak a tömb első megadott hosszúságú részében keres.',
		code: `static bool TartalmazE(int[] lista, int hossz, int ertek)
{
    int i = 0;

    while (i < hossz && lista[i] != ertek)
    {
        i++;
    }

    return i < hossz;
}`
	},
	{
		id: 7,
		category: 'Halmaz',
		title: 'Unio()',
		description: 'Két tömb unióját készíti el ismétlődés nélkül.',
		code: `static int[] Unio(int[] elso, int[] masodik)
{
    int[] eredmeny = new int[elso.Length + masodik.Length];
    int db = 0;

    for (int i = 0; i < elso.Length; i++)
    {
        eredmeny[db] = elso[i];
        db++;
    }

    for (int i = 0; i < masodik.Length; i++)
    {
        if (!TartalmazE(eredmeny, db, masodik[i]))
        {
            eredmeny[db] = masodik[i];
            db++;
        }
    }

    return Levag(eredmeny, db);
}`
	},
	{
		id: 8,
		category: 'Halmaz',
		title: 'Metszet()',
		description: 'Két tömb közös elemeit gyűjti ki.',
		code: `static int[] Metszet(int[] elso, int[] masodik)
{
    int[] eredmeny = new int[elso.Length];
    int db = 0;

    for (int i = 0; i < elso.Length; i++)
    {
        if (TartalmazE(masodik, elso[i]))
        {
            eredmeny[db] = elso[i];
            db++;
        }
    }

    return Levag(eredmeny, db);
}`
	},
	{
		id: 9,
		category: 'Keresés',
		title: 'KivalasztElsoLegalabb90()',
		description: 'Megkeresi az első legalább 90 pontos eredményt, és visszaadja a helyét és értékét.',
		code: `static bool KivalasztElsoLegalabb90(int[] pontok, out int hely, out int ertek)
{
    int i = 0;

    while (i < pontok.Length && pontok[i] < 90)
    {
        i++;
    }

    if (i < pontok.Length)
    {
        hely = i + 1;
        ertek = pontok[i];
        return true;
    }

    hely = -1;
    ertek = -1;
    return false;
}`
	},
	{
		id: 10,
		category: 'Keresés',
		title: 'Keres()',
		description: 'Lineáris keresés. Megkeresi a keresett érték helyét.',
		code: `static bool Keres(int[] lista, int keresett, out int hely)
{
    int i = 0;

    while (i < lista.Length && lista[i] != keresett)
    {
        i++;
    }

    if (i < lista.Length)
    {
        hely = i + 1;
        return true;
    }

    hely = -1;
    return false;
}`
	},
	{
		id: 11,
		category: 'Tételek',
		title: 'KivalogatLegalabb60()',
		description: 'Kiválogatja a legalább 60 pontos eredményeket.',
		code: `static int[] KivalogatLegalabb60(int[] pontok)
{
    int[] eredmeny = new int[pontok.Length];
    int db = 0;

    for (int i = 0; i < pontok.Length; i++)
    {
        if (pontok[i] >= 60)
        {
            eredmeny[db] = pontok[i];
            db++;
        }
    }

    return Levag(eredmeny, db);
}`
	},
	{
		id: 12,
		category: 'Tételek',
		title: 'MegszamolKisebbMint50()',
		description: 'Megszámolja, hány pontszám kisebb 50-nél.',
		code: `static int MegszamolKisebbMint50(int[] pontok)
{
    int db = 0;

    for (int i = 0; i < pontok.Length; i++)
    {
        if (pontok[i] < 50)
        {
            db++;
        }
    }

    return db;
}`
	},
	{
		id: 13,
		category: 'Rendezés',
		title: 'BuborekosRendezes()',
		description: 'Buborékos rendezés. Szomszédos elemeket hasonlít össze, és rossz sorrend esetén cserél.',
		code: `static void BuborekosRendezes(int[] lista)
{
    for (int i = 0; i < lista.Length - 1; i++)
    {
        for (int j = 0; j < lista.Length - 1 - i; j++)
        {
            if (lista[j] > lista[j + 1])
            {
                int seged = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = seged;
            }
        }
    }
}`
	},
	{
		id: 14,
		category: 'Rendezett',
		title: 'Osszefuttat()',
		description: 'Két rendezett tömböt összefuttat egyetlen rendezett tömbbé.',
		code: `static int[] Osszefuttat(int[] elso, int[] masodik)
{
    int[] eredmeny = new int[elso.Length + masodik.Length];

    int i = 0;
    int j = 0;
    int k = 0;

    while (i < elso.Length && j < masodik.Length)
    {
        if (elso[i] <= masodik[j])
        {
            eredmeny[k] = elso[i];
            i++;
        }
        else
        {
            eredmeny[k] = masodik[j];
            j++;
        }

        k++;
    }

    while (i < elso.Length)
    {
        eredmeny[k] = elso[i];
        i++;
        k++;
    }

    while (j < masodik.Length)
    {
        eredmeny[k] = masodik[j];
        j++;
        k++;
    }

    return eredmeny;
}`
	},
	{
		id: 15,
		category: 'Maximum',
		title: 'Top3Legnagyobb()',
		description: 'Kiválasztja a három legnagyobb pontszámot.',
		code: `static int[] Top3Legnagyobb(int[] pontok)
{
    int[] eredmeny = new int[3];
    bool[] felhasznalt = new bool[pontok.Length];

    for (int topIndex = 0; topIndex < 3; topIndex++)
    {
        int maxIndex = -1;

        for (int i = 0; i < pontok.Length; i++)
        {
            if (!felhasznalt[i])
            {
                if (maxIndex == -1 || pontok[i] > pontok[maxIndex])
                {
                    maxIndex = i;
                }
            }
        }

        eredmeny[topIndex] = pontok[maxIndex];
        felhasznalt[maxIndex] = true;
    }

    return eredmeny;
}`
	},
	{
		id: 16,
		category: 'Segéd',
		title: 'Levag()',
		description: 'A segédtömbből csak az első, ténylegesen használt elemeket adja vissza.',
		code: `static int[] Levag(int[] lista, int hossz)
{
    int[] eredmeny = new int[hossz];

    for (int i = 0; i < hossz; i++)
    {
        eredmeny[i] = lista[i];
    }

    return eredmeny;
}`
	},
	{
		id: 17,
		category: 'Segéd',
		title: 'Masolat()',
		description: 'Másolatot készít egy tömbről.',
		code: `static int[] Masolat(int[] lista)
{
    int[] masolat = new int[lista.Length];

    for (int i = 0; i < lista.Length; i++)
    {
        masolat[i] = lista[i];
    }

    return masolat;
}`
	},
	{
		id: 18,
		category: 'Segéd',
		title: 'KiirLista()',
		description: 'Kiír egy tömböt névvel együtt.',
		code: `static void KiirLista(string nev, int[] lista)
{
    Console.Write(nev + ": [");

    for (int i = 0; i < lista.Length; i++)
    {
        Console.Write(lista[i]);

        if (i < lista.Length - 1)
        {
            Console.Write(", ");
        }
    }

    Console.WriteLine("]");
}`
	}
];