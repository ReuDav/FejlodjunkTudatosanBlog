export type CodeLanguage = 'python' | 'csharp';

export type CodeExample = {
	language: CodeLanguage;
	code: string;
};

export type LibraryItem = {
	id: string;
	label: string;
	functionName: string;
	codes: CodeExample[];
};

export type AlgorithmCategory = {
	id: 'alapveto' | 'kereses' | 'rendezes';
	label: string;
	items: LibraryItem[];
};

export const categories: AlgorithmCategory[] = [
	{
		id: 'alapveto',
		label: 'Alapvető',
		items: [
			{
				id: 'osszegzes',
				label: 'Összegzés tétele',
				functionName: 'osszegzes_tetel',
				codes: [
					{
						language: 'python',
						code: `def osszegzes_tetel(szamok):
    osszeg = 0

    for szam in szamok:
        osszeg += szam

    return osszeg


def parosok_osszege(szamok):
    osszeg = 0

    for szam in szamok:
        if szam % 2 == 0:
            osszeg += szam

    return osszeg


def szamok_szorzata(szamok):
    szorzat = 1

    for szam in szamok:
        szorzat *= szam

    return szorzat


def kettoveloszthatok(szamok):
    parosak = []

    for szam in szamok:
        if szam % 2 == 0:
            parosak.append(szam)

    return parosak`
					},
					{
						language: 'csharp',
						code: `static int OsszegzesTetel(int[] szamok)
{
    int osszeg = 0;

    foreach (int szam in szamok)
    {
        osszeg += szam;
    }

    return osszeg;
}

static int ParosokOsszege(int[] szamok)
{
    int osszeg = 0;

    foreach (int szam in szamok)
    {
        if (szam % 2 == 0)
        {
            osszeg += szam;
        }
    }

    return osszeg;
}

static int SzamokSzorzata(int[] szamok)
{
    int szorzat = 1;

    foreach (int szam in szamok)
    {
        szorzat *= szam;
    }

    return szorzat;
}

static List<int> KettovelOszthatok(int[] szamok)
{
    List<int> parosak = new List<int>();

    foreach (int szam in szamok)
    {
        if (szam % 2 == 0)
        {
            parosak.Add(szam);
        }
    }

    return parosak;
}`
					}
				]
			},
			{
				id: 'kivalogatas',
				label: 'Kiválogatás tétele',
				functionName: 'kivalogatas',
				codes: [
					{
						language: 'python',
						code: `def kivalogatas(szamok, hatar):
    eredmeny = []

    for szam in szamok:
        if szam < hatar:
            eredmeny.append(szam)

    return eredmeny`
					},
					{
						language: 'csharp',
						code: `static List<int> Kivalogatas(int[] szamok, int hatar)
{
    List<int> eredmeny = new List<int>();

    foreach (int szam in szamok)
    {
        if (szam < hatar)
        {
            eredmeny.Add(szam);
        }
    }

    return eredmeny;
}`
					}
				]
			},
			{
				id: 'megszamlalas',
				label: 'Megszámlálás tétele',
				functionName: 'megszamlalas',
				codes: [
					{
						language: 'python',
						code: `def megszamlalas(szamok):
    db = 0

    for szam in szamok:
        db += 1

    return db


def parosok_szama(szamok):
    db = 0

    for szam in szamok:
        if szam % 2 == 0:
            db += 1

    return db`
					},
					{
						language: 'csharp',
						code: `static int Megszamlalas(int[] szamok)
{
    int db = 0;

    foreach (int szam in szamok)
    {
        db++;
    }

    return db;
}

static int ParosokSzama(int[] szamok)
{
    int db = 0;

    foreach (int szam in szamok)
    {
        if (szam % 2 == 0)
        {
            db++;
        }
    }

    return db;
}`
					}
				]
			},
			{
				id: 'eldontes',
				label: 'Eldöntés tétele',
				functionName: 'eldontes',
				codes: [
					{
						language: 'python',
						code: `def eldontes(szamok, keresett):
    for szam in szamok:
        if szam == keresett:
            return True

    return False`
					},
					{
						language: 'csharp',
						code: `static bool Eldontes(int[] szamok, int keresett)
{
    foreach (int szam in szamok)
    {
        if (szam == keresett)
        {
            return true;
        }
    }

    return false;
}`
					}
				]
			},
			{
				id: 'kivalasztas',
				label: 'Kiválasztás tétele',
				functionName: 'kivalasztas',
				codes: [
					{
						language: 'python',
						code: `def kivalasztas(szoveg, betu):
    for index in range(len(szoveg)):
        if szoveg[index] == betu:
            return index

    return -1`
					},
					{
						language: 'csharp',
						code: `static int Kivalasztas(string szoveg, char betu)
{
    for (int i = 0; i < szoveg.Length; i++)
    {
        if (szoveg[i] == betu)
        {
            return i;
        }
    }

    return -1;
}`
					}
				]
			},
			{
				id: 'szetvalogatas',
				label: 'Szétválogatás tétele',
				functionName: 'szetvalogatas',
				codes: [
					{
						language: 'python',
						code: `def szetvalogatas(szamok):
    pozitivak = []
    negativak = []

    for szam in szamok:
        if szam > 0:
            pozitivak.append(szam)
        elif szam < 0:
            negativak.append(szam)

    return pozitivak, negativak`
					},
					{
						language: 'csharp',
						code: `static (List<int> pozitivak, List<int> negativak) Szetvalogatas(int[] szamok)
{
    List<int> pozitivak = new List<int>();
    List<int> negativak = new List<int>();

    foreach (int szam in szamok)
    {
        if (szam > 0)
        {
            pozitivak.Add(szam);
        }
        else if (szam < 0)
        {
            negativak.Add(szam);
        }
    }

    return (pozitivak, negativak);
}`
					}
				]
			},
			{
				id: 'metszet',
				label: 'Metszet tétele',
				functionName: 'metszet',
				codes: [
					{
						language: 'python',
						code: `def metszet(lista1, lista2):
    kozos = []

    for elem in lista1:
        if elem in lista2 and elem not in kozos:
            kozos.append(elem)

    return kozos`
					},
					{
						language: 'csharp',
						code: `static List<int> Metszet(int[] lista1, int[] lista2)
{
    List<int> kozos = new List<int>();

    foreach (int elem in lista1)
    {
        if (lista2.Contains(elem) && !kozos.Contains(elem))
        {
            kozos.Add(elem);
        }
    }

    return kozos;
}`
					}
				]
			},
			{
				id: 'osszefuttatas',
				label: 'Összefuttatás tétele',
				functionName: 'osszefuttatas',
				codes: [
					{
						language: 'python',
						code: `def osszefuttatas(lista1, lista2):
    eredmeny = []
    i = 0
    j = 0

    while i < len(lista1) and j < len(lista2):
        if lista1[i] < lista2[j]:
            eredmeny.append(lista1[i])
            i += 1
        elif lista1[i] > lista2[j]:
            eredmeny.append(lista2[j])
            j += 1
        else:
            eredmeny.append(lista1[i])
            i += 1
            j += 1

    while i < len(lista1):
        eredmeny.append(lista1[i])
        i += 1

    while j < len(lista2):
        eredmeny.append(lista2[j])
        j += 1

    return eredmeny`
					},
					{
						language: 'csharp',
						code: `static List<int> Osszefuttatas(int[] lista1, int[] lista2)
{
    List<int> eredmeny = new List<int>();
    int i = 0;
    int j = 0;

    while (i < lista1.Length && j < lista2.Length)
    {
        if (lista1[i] < lista2[j])
        {
            eredmeny.Add(lista1[i]);
            i++;
        }
        else if (lista1[i] > lista2[j])
        {
            eredmeny.Add(lista2[j]);
            j++;
        }
        else
        {
            eredmeny.Add(lista1[i]);
            i++;
            j++;
        }
    }

    while (i < lista1.Length)
    {
        eredmeny.Add(lista1[i]);
        i++;
    }

    while (j < lista2.Length)
    {
        eredmeny.Add(lista2[j]);
        j++;
    }

    return eredmeny;
}`
					}
				]
			}
		]
	},
	{
		id: 'kereses',
		label: 'Keresés',
		items: [
			{
				id: 'linearis-kereses',
				label: 'Lineáris keresés',
				functionName: 'linearis_kereses',
				codes: [
					{
						language: 'python',
						code: `def linearis_kereses(lista, keresett):
    for index in range(len(lista)):
        if lista[index] == keresett:
            return index

    return -1`
					},
					{
						language: 'csharp',
						code: `static int LinearisKereses(int[] lista, int keresett)
{
    for (int i = 0; i < lista.Length; i++)
    {
        if (lista[i] == keresett)
        {
            return i;
        }
    }

    return -1;
}`
					}
				]
			},
			{
				id: 'linearis-kereses-while',
				label: 'Lineáris keresés while',
				functionName: 'linearis_kereses_while',
				codes: [
					{
						language: 'python',
						code: `def linearis_kereses_while(lista, keresett):
    index = 0

    while index < len(lista) and lista[index] != keresett:
        index += 1

    if index < len(lista):
        return index

    return -1`
					},
					{
						language: 'csharp',
						code: `static int LinearisKeresesWhile(int[] lista, int keresett)
{
    int index = 0;

    while (index < lista.Length && lista[index] != keresett)
    {
        index++;
    }

    if (index < lista.Length)
    {
        return index;
    }

    return -1;
}`
					}
				]
			},
			{
				id: 'strazsas-kereses',
				label: 'Strázsás keresés',
				functionName: 'strazsas_kereses',
				codes: [
					{
						language: 'python',
						code: `def strazsas_kereses(lista, keresett):
    masolat = lista.copy()
    masolat.append(keresett)

    index = 0

    while masolat[index] != keresett:
        index += 1

    if index < len(lista):
        return index

    return -1`
					},
					{
						language: 'csharp',
						code: `static int StrazsasKereses(int[] lista, int keresett)
{
    int[] masolat = new int[lista.Length + 1];

    for (int i = 0; i < lista.Length; i++)
    {
        masolat[i] = lista[i];
    }

    masolat[masolat.Length - 1] = keresett;

    int index = 0;

    while (masolat[index] != keresett)
    {
        index++;
    }

    if (index < lista.Length)
    {
        return index;
    }

    return -1;
}`
					}
				]
			},
			{
				id: 'linearis-kereses-rendezett',
				label: 'Lineáris keresés rendezett sorozatban',
				functionName: 'linearis_kereses_rendezett',
				codes: [
					{
						language: 'python',
						code: `def linearis_kereses_rendezett(lista, keresett):
    for index in range(len(lista)):
        if lista[index] == keresett:
            return index

        if lista[index] > keresett:
            return -1

    return -1`
					},
					{
						language: 'csharp',
						code: `static int LinearisKeresesRendezett(int[] lista, int keresett)
{
    for (int i = 0; i < lista.Length; i++)
    {
        if (lista[i] == keresett)
        {
            return i;
        }

        if (lista[i] > keresett)
        {
            return -1;
        }
    }

    return -1;
}`
					}
				]
			},
			{
				id: 'binaris-kereses',
				label: 'Bináris keresés',
				functionName: 'binaris_kereses',
				codes: [
					{
						language: 'python',
						code: `def binaris_kereses(lista, keresett):
    also = 0
    felso = len(lista) - 1

    while also <= felso:
        kozep = (also + felso) // 2

        if lista[kozep] == keresett:
            return kozep

        if lista[kozep] < keresett:
            also = kozep + 1
        else:
            felso = kozep - 1

    return -1`
					},
					{
						language: 'csharp',
						code: `static int BinarisKereses(int[] lista, int keresett)
{
    int also = 0;
    int felso = lista.Length - 1;

    while (also <= felso)
    {
        int kozep = (also + felso) / 2;

        if (lista[kozep] == keresett)
        {
            return kozep;
        }

        if (lista[kozep] < keresett)
        {
            also = kozep + 1;
        }
        else
        {
            felso = kozep - 1;
        }
    }

    return -1;
}`
					}
				]
			},
			{
				id: 'ugro-kereses',
				label: 'Ugró keresés',
				functionName: 'ugro_kereses',
				codes: [
					{
						language: 'python',
						code: `import math

def ugro_kereses(lista, keresett):
    n = len(lista)
    lepes = int(math.sqrt(n))

    for bal in range(0, n, lepes):
        jobb = min(bal + lepes, n)

        if lista[jobb - 1] >= keresett:
            for index in range(bal, jobb):
                if lista[index] == keresett:
                    return index

            return -1

    return -1`
					},
					{
						language: 'csharp',
						code: `static int UgroKereses(int[] lista, int keresett)
{
    int n = lista.Length;
    int lepes = (int)Math.Sqrt(n);

    for (int bal = 0; bal < n; bal += lepes)
    {
        int jobb = Math.Min(bal + lepes, n);

        if (lista[jobb - 1] >= keresett)
        {
            for (int i = bal; i < jobb; i++)
            {
                if (lista[i] == keresett)
                {
                    return i;
                }
            }

            return -1;
        }
    }

    return -1;
}`
					}
				]
			}
		]
	},
	{
		id: 'rendezes',
		label: 'Rendezés',
		items: [
			{
				id: 'beszuro-rendezes',
				label: 'Beszúró rendezés',
				functionName: 'beszuro_rendezes',
				codes: [
					{
						language: 'python',
						code: `def beszuro_rendezes(lista):
    for i in range(1, len(lista)):
        kulcs = lista[i]
        j = i - 1

        while j >= 0 and lista[j] > kulcs:
            lista[j + 1] = lista[j]
            j -= 1

        lista[j + 1] = kulcs

    return lista`
					},
					{
						language: 'csharp',
						code: `static int[] BeszuroRendezes(int[] lista)
{
    for (int i = 1; i < lista.Length; i++)
    {
        int kulcs = lista[i];
        int j = i - 1;

        while (j >= 0 && lista[j] > kulcs)
        {
            lista[j + 1] = lista[j];
            j--;
        }

        lista[j + 1] = kulcs;
    }

    return lista;
}`
					}
				]
			},
			{
				id: 'buborek-rendezes',
				label: 'Buborék rendezés',
				functionName: 'buborekrendezes',
				codes: [
					{
						language: 'python',
						code: `def buborekrendezes(lista):
    n = len(lista)

    for i in range(n):
        volt_csere = False

        for j in range(0, n - i - 1):
            if lista[j] > lista[j + 1]:
                lista[j], lista[j + 1] = lista[j + 1], lista[j]
                volt_csere = True

        if not volt_csere:
            break

    return lista`
					},
					{
						language: 'csharp',
						code: `static int[] BuborekRendezes(int[] lista)
{
    int n = lista.Length;

    for (int i = 0; i < n; i++)
    {
        bool voltCsere = false;

        for (int j = 0; j < n - i - 1; j++)
        {
            if (lista[j] > lista[j + 1])
            {
                int csere = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = csere;

                voltCsere = true;
            }
        }

        if (!voltCsere)
        {
            break;
        }
    }

    return lista;
}`
					}
				]
			},
			{
				id: 'kivalasztasos-rendezes',
				label: 'Kiválasztásos rendezés',
				functionName: 'kivalasztasos_rendezes',
				codes: [
					{
						language: 'python',
						code: `def kivalasztasos_rendezes(lista):
    n = len(lista)

    for i in range(n):
        min_index = i

        for j in range(i + 1, n):
            if lista[j] < lista[min_index]:
                min_index = j

        lista[i], lista[min_index] = lista[min_index], lista[i]

    return lista`
					},
					{
						language: 'csharp',
						code: `static int[] KivalasztasosRendezes(int[] lista)
{
    int n = lista.Length;

    for (int i = 0; i < n; i++)
    {
        int minIndex = i;

        for (int j = i + 1; j < n; j++)
        {
            if (lista[j] < lista[minIndex])
            {
                minIndex = j;
            }
        }

        int csere = lista[i];
        lista[i] = lista[minIndex];
        lista[minIndex] = csere;
    }

    return lista;
}`
					}
				]
			},
			{
				id: 'fesus-rendezes',
				label: 'Fésűs rendezés',
				functionName: 'fesus_rendezes',
				codes: [
					{
						language: 'python',
						code: `def fesus_rendezes(lista):
    n = len(lista)
    res = n
    volt_csere = True

    while res > 1 or volt_csere:
        res = max(1, int(res / 1.3))
        volt_csere = False

        for i in range(0, n - res):
            if lista[i] > lista[i + res]:
                lista[i], lista[i + res] = lista[i + res], lista[i]
                volt_csere = True

    return lista`
					},
					{
						language: 'csharp',
						code: `static int[] FesusRendezes(int[] lista)
{
    int n = lista.Length;
    int res = n;
    bool voltCsere = true;

    while (res > 1 || voltCsere)
    {
        res = Math.Max(1, (int)(res / 1.3));
        voltCsere = false;

        for (int i = 0; i < n - res; i++)
        {
            if (lista[i] > lista[i + res])
            {
                int csere = lista[i];
                lista[i] = lista[i + res];
                lista[i + res] = csere;

                voltCsere = true;
            }
        }
    }

    return lista;
}`
					}
				]
			},
			{
				id: 'koktel-rendezes',
				label: 'Koktél rendezés',
				functionName: 'koktel_rendezes',
				codes: [
					{
						language: 'python',
						code: `def koktel_rendezes(lista):
    bal = 0
    jobb = len(lista) - 1
    volt_csere = True

    while volt_csere:
        volt_csere = False

        for i in range(bal, jobb):
            if lista[i] > lista[i + 1]:
                lista[i], lista[i + 1] = lista[i + 1], lista[i]
                volt_csere = True

        if not volt_csere:
            break

        jobb -= 1
        volt_csere = False

        for i in range(jobb - 1, bal - 1, -1):
            if lista[i] > lista[i + 1]:
                lista[i], lista[i + 1] = lista[i + 1], lista[i]
                volt_csere = True

        bal += 1

    return lista`
					},
					{
						language: 'csharp',
						code: `static int[] KoktelRendezes(int[] lista)
{
    int bal = 0;
    int jobb = lista.Length - 1;
    bool voltCsere = true;

    while (voltCsere)
    {
        voltCsere = false;

        for (int i = bal; i < jobb; i++)
        {
            if (lista[i] > lista[i + 1])
            {
                int csere = lista[i];
                lista[i] = lista[i + 1];
                lista[i + 1] = csere;

                voltCsere = true;
            }
        }

        if (!voltCsere)
        {
            break;
        }

        jobb--;
        voltCsere = false;

        for (int i = jobb - 1; i >= bal; i--)
        {
            if (lista[i] > lista[i + 1])
            {
                int csere = lista[i];
                lista[i] = lista[i + 1];
                lista[i + 1] = csere;

                voltCsere = true;
            }
        }

        bal++;
    }

    return lista;
}`
					}
				]
			},
			{
				id: 'gyors-rendezes',
				label: 'Gyorsrendezés',
				functionName: 'gyors_rendezes',
				codes: [
					{
						language: 'python',
						code: `def particionalas(lista, also, felso):
    pivot = lista[felso]
    kisebb = also - 1

    for i in range(also, felso):
        if lista[i] < pivot:
            kisebb += 1
            lista[kisebb], lista[i] = lista[i], lista[kisebb]

    lista[kisebb + 1], lista[felso] = lista[felso], lista[kisebb + 1]

    return kisebb + 1


def gyors_rendezes(lista, also, felso):
    if also < felso:
        pivot_index = particionalas(lista, also, felso)

        gyors_rendezes(lista, also, pivot_index - 1)
        gyors_rendezes(lista, pivot_index + 1, felso)

    return lista`
					},
					{
						language: 'csharp',
						code: `static int Particionalas(int[] lista, int also, int felso)
{
    int pivot = lista[felso];
    int kisebb = also - 1;

    for (int i = also; i < felso; i++)
    {
        if (lista[i] < pivot)
        {
            kisebb++;

            int csere = lista[kisebb];
            lista[kisebb] = lista[i];
            lista[i] = csere;
        }
    }

    int pivotCsere = lista[kisebb + 1];
    lista[kisebb + 1] = lista[felso];
    lista[felso] = pivotCsere;

    return kisebb + 1;
}

static int[] GyorsRendezes(int[] lista, int also, int felso)
{
    if (also < felso)
    {
        int pivotIndex = Particionalas(lista, also, felso);

        GyorsRendezes(lista, also, pivotIndex - 1);
        GyorsRendezes(lista, pivotIndex + 1, felso);
    }

    return lista;
}`
					}
				]
			}
		]
	}
];
