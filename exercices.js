// Banque d'exercices, basée sur les chapitres IN211 (Ch01 à Ch03) et les séries Moodle.
// Chaque exercice : énoncé, code de départ, solution et tests.
// Un test = du code Python lancé APRÈS le code de l'étudiant ;
// tout ce qu'il affiche (print) est comparé à "attendu".
// "cache: true" => l'étudiant voit seulement si le test passe, pas son contenu.

const SANS_MIN_MAX = (appel) =>
  "import builtins\n_min, _max = builtins.min, builtins.max\nbuiltins.min = builtins.max = None\ntry:\n    print(" + appel + ")\nfinally:\n    builtins.min, builtins.max = _min, _max";

window.EXERCICES = [
  // ======================= Ch01 : Fonctions et arguments =======================
  {
    id: "c1-minmax",
    serie: "Ch01 : Fonctions et arguments",
    titre: "Altitudes min et max (drone)",
    enonce: "Écrire une fonction <code>get_min_max(altitudes)</code> qui prend la liste des altitudes enregistrées pendant un vol de drone et <strong>renvoie</strong> l'altitude minimale et l'altitude maximale (dans cet ordre), <strong>sans utiliser</strong> <code>min()</code> ni <code>max()</code>.<br>La liste contient au moins une valeur.",
    code_depart: `def get_min_max(altitudes):
    pass
`,
    solution: `def get_min_max(altitudes):
    mini = altitudes[0]
    maxi = altitudes[0]
    for a in altitudes:
        if a < mini:
            mini = a
        if a > maxi:
            maxi = a
    return mini, maxi
`,
    tests: [
      { code: "print(get_min_max([120, 80, 300, 150]))", attendu: "(80, 300)" },
      { code: "a, b = get_min_max([50])\nprint(a, b)", attendu: "50 50" },
      { code: "print(get_min_max([-10, 5, -30, 0]))", attendu: "(-30, 5)", cache: true },
      { code: SANS_MIN_MAX("get_min_max([3, 9, 1, 7])"), attendu: "(1, 9)", cache: true },
    ],
  },
  {
    id: "c1-travel-cost",
    serie: "Ch01 : Fonctions et arguments",
    titre: "Coût d'un voyage (valeur par défaut)",
    enonce: "Écrire une fonction <code>travel_cost</code> qui prend en paramètres :<ul><li><code>distance</code> : la distance parcourue (en km)</li><li><code>price</code> : le coût par kilomètre</li><li><code>tax_rate</code> : le taux de TVA, <strong>0.2 par défaut</strong></li></ul>La fonction renvoie le coût total du voyage, TVA incluse.",
    code_depart: `def travel_cost():
    pass
`,
    solution: `def travel_cost(distance, price, tax_rate=0.2):
    return distance * price * (1 + tax_rate)
`,
    tests: [
      { code: "print(round(travel_cost(100, 0.5), 2))", attendu: "60.0" },
      { code: "print(round(travel_cost(250, 0.12, 0.1), 2))", attendu: "33.0" },
      { code: "print(round(travel_cost(80, 1, tax_rate=0), 2))", attendu: "80" , cache: true },
      { code: "print(round(travel_cost(tax_rate=0.055, price=2, distance=10), 2))", attendu: "21.1", cache: true },
    ],
  },
  {
    id: "c1-average-speed",
    serie: "Ch01 : Fonctions et arguments",
    titre: "Vitesse moyenne (*args)",
    enonce: "Écrire une fonction <code>average_speed</code> qui accepte <strong>un nombre quelconque</strong> de vitesses en arguments et retourne leur moyenne.<br>Si aucune vitesse n'est fournie, elle retourne <code>None</code>.",
    code_depart: `def average_speed():
    pass
`,
    solution: `def average_speed(*speeds):
    if len(speeds) == 0:
        return None
    total = 0
    for s in speeds:
        total += s
    return total / len(speeds)
`,
    tests: [
      { code: "print(average_speed(800, 850, 900))", attendu: "850.0" },
      { code: "print(average_speed(120))", attendu: "120.0" },
      { code: "print(average_speed())", attendu: "None", cache: true },
      { code: "vitesses = [100, 200, 300, 400]\nprint(average_speed(*vitesses))", attendu: "250.0", cache: true },
    ],
  },
  {
    id: "c1-increase",
    serie: "Ch01 : Fonctions et arguments",
    titre: "Augmenter des altitudes",
    enonce: "Écrire une fonction <code>increase_altitudes</code> qui prend en arguments :<ul><li><code>offset</code> : une augmentation d'altitude (en mètres)</li><li><code>*altitudes</code> : un nombre arbitraire d'altitudes</li></ul>La fonction <strong>retourne une liste</strong> contenant les nouvelles altitudes après ajout de <code>offset</code>.",
    code_depart: `def increase_altitudes(offset, *altitudes):
    pass
`,
    solution: `def increase_altitudes(offset, *altitudes):
    resultat = []
    for a in altitudes:
        resultat.append(a + offset)
    return resultat
`,
    tests: [
      { code: "print(increase_altitudes(100, 1000, 2000, 3500))", attendu: "[1100, 2100, 3600]" },
      { code: "print(increase_altitudes(50))", attendu: "[]" },
      { code: "print(increase_altitudes(-200, 500, 250))", attendu: "[300, 50]", cache: true },
      { code: "r = increase_altitudes(1, 1, 2)\nprint(type(r).__name__)", attendu: "list", cache: true },
    ],
  },
  {
    id: "c1-characteristic",
    serie: "Ch01 : Fonctions et arguments",
    titre: "Caractéristique d'un véhicule (**kwargs)",
    enonce: "Écrire une fonction <code>get_characteristic</code> qui prend en paramètres :<ul><li><code>key</code> : le nom de la caractéristique recherchée</li><li><code>**vehicule</code> : un nombre arbitraire de caractéristiques d'un véhicule</li></ul>La fonction retourne la valeur associée à <code>key</code> si cette caractéristique existe, sinon <code>None</code>.",
    code_depart: `def get_characteristic(key, **vehicule):
    pass
`,
    solution: `def get_characteristic(key, **vehicule):
    if key in vehicule:
        return vehicule[key]
    return None
`,
    tests: [
      { code: 'print(get_characteristic("speed", name="A320", speed=850, altitude=11000, passengers=180))', attendu: "850" },
      { code: 'print(get_characteristic("autonomy", name="Drone X1", mass=12.5, max_speed=120))', attendu: "None" },
      { code: 'infos = {"name": "ATR 72", "mass": 22.8}\nprint(get_characteristic("mass", **infos))', attendu: "22.8", cache: true },
      { code: 'print(get_characteristic("name"))', attendu: "None", cache: true },
    ],
  },
  {
    id: "c1-test-report",
    serie: "Ch01 : Fonctions et arguments",
    titre: "Rapport d'essai (tous les types de paramètres)",
    enonce: "Écrire une fonction <code>test_report</code> qui prend en paramètres :<ul><li>le nom d'un essai (obligatoire)</li><li>une valeur limite, égale à <code>0</code> par défaut</li><li>un nombre quelconque de mesures</li><li>un nombre quelconque d'informations complémentaires (arguments nommés)</li></ul>La fonction doit :<ol><li>afficher le nom de l'essai</li><li>afficher chaque information complémentaire sur une ligne, au format <code>cle : valeur</code></li><li><strong>retourner</strong> la liste des mesures supérieures ou égales à la limite</li></ol>Respecte l'ordre des paramètres vu en cours.",
    code_depart: `def test_report():
    pass
`,
    solution: `def test_report(name, limit=0, *measures, **infos):
    print(name)
    for key, value in infos.items():
        print(key, ":", value)
    resultat = []
    for m in measures:
        if m >= limit:
            resultat.append(m)
    return resultat
`,
    tests: [
      {
        code: 'r = test_report("Essai moteur", 50, 40, 55, 70, 50, operateur="Martin", lieu="Banc 2")\nprint(r)',
        attendu: "Essai moteur\noperateur : Martin\nlieu : Banc 2\n[55, 70, 50]",
      },
      { code: 'print(test_report("Essai vide"))', attendu: "Essai vide\n[]" },
      { code: 'print(test_report("T", 10, 5, 15, 10, 9.9))', attendu: "T\n[15, 10]", cache: true },
      { code: 'print(test_report("Froid", -5, -10, -5, 0, meteo="neige"))', attendu: "Froid\nmeteo : neige\n[-5, 0]", cache: true },
    ],
  },
  {
    id: "c1-analyze-scores",
    serie: "Ch01 : Fonctions et arguments",
    titre: "★ Analyse des scores d'un joueur",
    enonce: "Écrire une fonction <code>analyze_scores</code> qui reçoit le nom du joueur, un nombre quelconque de scores et des options nommées :<ul><li>les scores strictement inférieurs à <code>minimum</code> sont ignorés (<code>minimum</code> vaut 0 par défaut)</li><li>si <code>remove_duplicates=True</code>, un même score n'est compté qu'une fois, en gardant l'ordre d'apparition (<code>False</code> par défaut)</li><li><code>bonus</code> est ajouté à chaque score conservé (0 par défaut)</li><li>d'autres informations peuvent être fournies en arguments nommés</li></ul>La fonction affiche le nom du joueur, puis chaque information complémentaire au format <code>cle : valeur</code>.<br>Elle <strong>retourne trois valeurs</strong> : la liste des scores conservés (bonus appliqué), leur moyenne (<code>None</code> si aucun score), et le nombre de scores ≥ 15 (bonus appliqué).",
    code_depart: `def analyze_scores():
    pass
`,
    solution: `def analyze_scores(name, *scores, minimum=0, remove_duplicates=False, bonus=0, **infos):
    print(name)
    for key, value in infos.items():
        print(key, ":", value)
    gardes = []
    for s in scores:
        if s < minimum:
            continue
        if remove_duplicates and s + bonus in gardes:
            continue
        gardes.append(s + bonus)
    if len(gardes) == 0:
        moyenne = None
    else:
        moyenne = sum(gardes) / len(gardes)
    nb = 0
    for s in gardes:
        if s >= 15:
            nb += 1
    return gardes, moyenne, nb
`,
    tests: [
      {
        code: 'scores, average, count = analyze_scores(\n    "Lina",\n    12, 8, 15, 15, 4, 20, 10,\n    minimum=10,\n    remove_duplicates=True,\n    bonus=2,\n    game="Challenge"\n)\nprint(scores)\nprint(average)\nprint(count)',
        attendu: "Lina\ngame : Challenge\n[14, 17, 22, 12]\n16.25\n2",
      },
      { code: 's, a, c = analyze_scores("Tom", 5, 3)\nprint(s, a, c)', attendu: "Tom\n[5, 3] 4.0 0" },
      { code: 's, a, c = analyze_scores("Zoé", 2, 4, minimum=10)\nprint(s, a, c)', attendu: "Zoé\n[] None 0", cache: true },
      { code: 's, a, c = analyze_scores("Ana", 15, 15, 14, bonus=1)\nprint(s, a, c)', attendu: "Ana\n[16, 16, 15] 15.666666666666666 3", cache: true },
      { code: 's, a, c = analyze_scores("Max", 18, 9, 18, remove_duplicates=True, niveau=3, mode="duo")\nprint(s, a, c)', attendu: "Max\nniveau : 3\nmode : duo\n[18, 9] 13.5 1", cache: true },
    ],
  },

  // ======================= Ch02 : Modélisation UML → Python =======================
  {
    id: "c2-distributeur",
    serie: "Ch02 : De l'UML au code",
    titre: "★ Distributeur de boissons",
    enonce: "Implémenter la classe décrite par ce diagramme UML :<pre class=\"uml\">┌──────────────────────────────────────────┐\n│              Distributeur                │\n├──────────────────────────────────────────┤\n│ + stock : dict      (boisson → quantité) │\n│ + prix : dict       (boisson → prix)     │\n│ + credit : float    (0 au départ)        │\n│ + recette : float   (0 au départ)        │\n├──────────────────────────────────────────┤\n│ + remplir(boisson, quantite, prix)       │\n│ + inserer(montant)                       │\n│ + choisir(boisson) : float | None        │\n│ + annuler() : float                      │\n└──────────────────────────────────────────┘</pre><ul><li><code>remplir</code> (maintenance) : ajoute <code>quantite</code> au stock de la boisson et fixe son prix.</li><li><code>inserer</code> : ajoute le montant au crédit. Si le montant est ≤ 0, affiche <code>Montant invalide</code>.</li><li><code>choisir</code> : si la boisson est absente ou épuisée, affiche <code>Boisson indisponible</code> et renvoie <code>None</code>. Si le crédit est insuffisant, affiche <code>Crédit insuffisant</code> et renvoie <code>None</code>. Sinon : retire une boisson du stock, ajoute son prix à la recette, remet le crédit à 0 et <strong>renvoie la monnaie</strong> arrondie à 2 décimales.</li><li><code>annuler</code> : renvoie le crédit et le remet à 0.</li></ul>",
    code_depart: `class Distributeur:
    def __init__(self):
        pass
`,
    solution: `class Distributeur:
    def __init__(self):
        self.stock = {}
        self.prix = {}
        self.credit = 0.0
        self.recette = 0.0

    def remplir(self, boisson, quantite, prix):
        self.stock[boisson] = self.stock.get(boisson, 0) + quantite
        self.prix[boisson] = prix

    def inserer(self, montant):
        if montant <= 0:
            print("Montant invalide")
        else:
            self.credit += montant

    def choisir(self, boisson):
        if self.stock.get(boisson, 0) == 0:
            print("Boisson indisponible")
            return None
        if self.credit < self.prix[boisson]:
            print("Crédit insuffisant")
            return None
        self.stock[boisson] -= 1
        self.recette += self.prix[boisson]
        monnaie = round(self.credit - self.prix[boisson], 2)
        self.credit = 0.0
        return monnaie

    def annuler(self):
        rendu = self.credit
        self.credit = 0.0
        return rendu
`,
    tests: [
      {
        code: 'd = Distributeur()\nd.remplir("Café", 2, 1.2)\nd.inserer(2.0)\nprint(d.choisir("Café"))\nprint(d.stock["Café"], d.recette, d.credit == 0)',
        attendu: "0.8\n1 1.2 True",
      },
      {
        code: 'd = Distributeur()\nd.remplir("Thé", 1, 1.5)\nd.inserer(1.0)\nprint(d.choisir("Thé"))\nprint(d.annuler(), d.credit == 0)',
        attendu: "Crédit insuffisant\nNone\n1.0 True",
      },
      {
        code: 'd = Distributeur()\nd.remplir("Eau", 1, 0.5)\nprint(d.choisir("Soda"))\nd.inserer(1.0)\nprint(d.choisir("Eau"))\nd.inserer(1.0)\nprint(d.choisir("Eau"))\nprint(d.annuler())',
        attendu: "Boisson indisponible\nNone\n0.5\nBoisson indisponible\nNone\n1.0",
        cache: true,
      },
      { code: 'd = Distributeur()\nd.inserer(-2)\nd.inserer(0)\nprint(d.credit == 0)', attendu: "Montant invalide\nMontant invalide\nTrue", cache: true },
      {
        code: 'd = Distributeur()\nd.remplir("Café", 1, 1.0)\nd.remplir("Café", 2, 1.1)\nd.inserer(0.5)\nd.inserer(0.6)\nprint(d.choisir("Café"), d.stock["Café"])',
        attendu: "0.0 2",
        cache: true,
      },
    ],
  },
  {
    id: "c2-bibliotheque",
    serie: "Ch02 : De l'UML au code",
    titre: "★ Bibliothèque : emprunts et retours",
    enonce: "Implémenter les deux classes de ce diagramme UML :<pre class=\"uml\">┌──────────────────────┐      ┌───────────────────────────────────────┐\n│        Livre         │      │             Bibliotheque              │\n├──────────────────────┤      ├───────────────────────────────────────┤\n│ + titre : str        │      │ + nom : str                           │\n│ + auteur : str       │◄─────│ + livres : list  (de Livre)           │\n│ + disponible : bool  │      │ + emprunts : dict (titre → abonné)    │\n└──────────────────────┘      ├───────────────────────────────────────┤\n                              │ + ajouter(livre)                      │\n                              │ + chercher(titre) : Livre | None      │\n                              │ + emprunter(titre, abonne) : bool     │\n                              │ + rendre(titre) : bool                │\n                              │ + disponibles() : list                │\n                              │ + livres_de(abonne) : list            │\n                              └───────────────────────────────────────┘</pre><ul><li>Un <code>Livre</code> est créé avec <code>Livre(titre, auteur)</code> et est disponible au départ.</li><li><code>Bibliotheque(nom)</code> démarre sans livre ni emprunt.</li><li><code>emprunter</code> renvoie <code>False</code> si le livre n'existe pas ou n'est pas disponible ; sinon il le marque indisponible, note l'emprunt et renvoie <code>True</code>.</li><li><code>rendre</code> renvoie <code>False</code> si le livre n'était pas emprunté ; sinon il le rend disponible, supprime l'emprunt et renvoie <code>True</code>.</li><li><code>disponibles()</code> renvoie la liste des <strong>titres</strong> disponibles, dans l'ordre d'ajout. <code>livres_de(abonne)</code> renvoie les titres empruntés par cet abonné.</li></ul>",
    code_depart: `class Livre:
    pass


class Bibliotheque:
    pass
`,
    solution: `class Livre:
    def __init__(self, titre, auteur):
        self.titre = titre
        self.auteur = auteur
        self.disponible = True


class Bibliotheque:
    def __init__(self, nom):
        self.nom = nom
        self.livres = []
        self.emprunts = {}

    def ajouter(self, livre):
        self.livres.append(livre)

    def chercher(self, titre):
        for livre in self.livres:
            if livre.titre == titre:
                return livre
        return None

    def emprunter(self, titre, abonne):
        livre = self.chercher(titre)
        if livre is None or not livre.disponible:
            return False
        livre.disponible = False
        self.emprunts[titre] = abonne
        return True

    def rendre(self, titre):
        if titre not in self.emprunts:
            return False
        del self.emprunts[titre]
        self.chercher(titre).disponible = True
        return True

    def disponibles(self):
        return [l.titre for l in self.livres if l.disponible]

    def livres_de(self, abonne):
        return [t for t, a in self.emprunts.items() if a == abonne]
`,
    tests: [
      {
        code: 'b = Bibliotheque("BU")\nb.ajouter(Livre("Dune", "Herbert"))\nb.ajouter(Livre("1984", "Orwell"))\nprint(b.emprunter("Dune", "Lina"), b.emprunter("Dune", "Tom"))\nprint(b.disponibles())',
        attendu: "True False\n['1984']",
      },
      {
        code: 'b = Bibliotheque("BU")\nb.ajouter(Livre("Dune", "Herbert"))\nb.emprunter("Dune", "Lina")\nprint(b.rendre("Dune"), b.rendre("Dune"))\nprint(b.chercher("Dune").disponible, b.emprunts)',
        attendu: "True False\nTrue {}",
      },
      {
        code: 'b = Bibliotheque("BU")\nprint(b.emprunter("Fantôme", "Lina"), b.chercher("Fantôme"))\nprint(Livre("A", "B").disponible)',
        attendu: "False None\nTrue",
        cache: true,
      },
      {
        code: 'b = Bibliotheque("BU")\nfor t in ["A", "B", "C", "D"]:\n    b.ajouter(Livre(t, "x"))\nb.emprunter("A", "Lina")\nb.emprunter("C", "Lina")\nb.emprunter("B", "Tom")\nprint(b.livres_de("Lina"), b.livres_de("Zoé"))\nprint(b.disponibles())',
        attendu: "['A', 'C'] []\n['D']",
        cache: true,
      },
    ],
  },

  // ======================= Ch03 : Classes et objets =======================
  {
    id: "c3-robot",
    serie: "Ch03 : Classes et objets",
    titre: "★ Robot : pilotage et flotte",
    enonce: "Écrire une classe <code>Robot</code> (exercices 3.1 à 3.4) :<ul><li>Attributs de classe : <code>nombre_de_robots = 0</code> et <code>BATTERIE_CRITIQUE = 15</code>.</li><li>Constructeur <code>Robot(nom)</code> : <code>niveau_batterie</code> à 100, <code>en_marche</code> à <code>False</code>, et incrémente <code>nombre_de_robots</code>.</li><li><code>allumer()</code> : passe en marche et affiche <code>&lt;nom&gt; est prêt.</code></li><li><code>eteindre()</code> : s'arrête et affiche <code>&lt;nom&gt; s'arrête.</code></li><li><code>verifier_energie()</code> : renvoie <code>True</code> si la batterie est strictement supérieure à <code>BATTERIE_CRITIQUE</code>.</li><li><code>avancer(distance)</code> :<ul><li>robot éteint → affiche <code>Alerte : &lt;nom&gt; est éteint.</code></li><li>énergie insuffisante (utiliser <code>verifier_energie()</code>) → affiche <code>Alerte : batterie trop faible pour &lt;nom&gt;.</code></li><li>sinon → la batterie baisse de 1 % par mètre et affiche <code>&lt;nom&gt; a avancé de &lt;distance&gt; m.</code></li></ul></li></ul>",
    code_depart: `class Robot:
    pass
`,
    solution: `class Robot:
    nombre_de_robots = 0
    BATTERIE_CRITIQUE = 15

    def __init__(self, nom):
        self.nom = nom
        self.niveau_batterie = 100
        self.en_marche = False
        Robot.nombre_de_robots += 1

    def allumer(self):
        self.en_marche = True
        print(f"{self.nom} est prêt.")

    def eteindre(self):
        self.en_marche = False
        print(f"{self.nom} s'arrête.")

    def verifier_energie(self):
        return self.niveau_batterie > Robot.BATTERIE_CRITIQUE

    def avancer(self, distance):
        if not self.en_marche:
            print(f"Alerte : {self.nom} est éteint.")
        elif not self.verifier_energie():
            print(f"Alerte : batterie trop faible pour {self.nom}.")
        else:
            self.niveau_batterie -= distance
            print(f"{self.nom} a avancé de {distance} m.")
`,
    tests: [
      {
        code: 'alpha = Robot("alpha")\nbeta = Robot("beta")\nprint(alpha.nom, alpha.niveau_batterie, alpha.en_marche)\nprint(Robot.nombre_de_robots)',
        attendu: "alpha 100 False\n2",
      },
      {
        code: 'alpha = Robot("alpha")\nalpha.avancer(5)\nalpha.allumer()\nalpha.avancer(5)\nprint(alpha.niveau_batterie)\nalpha.eteindre()',
        attendu: "Alerte : alpha est éteint.\nalpha est prêt.\nalpha a avancé de 5 m.\n95\nalpha s'arrête.",
      },
      {
        code: 'r = Robot("R2")\nr.allumer()\nr.avancer(50)\nr.avancer(40)\nr.avancer(5)\nprint(r.niveau_batterie, r.verifier_energie())\nr.niveau_batterie = 100\nr.avancer(5)',
        attendu: "R2 est prêt.\nR2 a avancé de 50 m.\nR2 a avancé de 40 m.\nAlerte : batterie trop faible pour R2.\n10 False\nR2 a avancé de 5 m.",
        cache: true,
      },
      {
        code: 'a = Robot("a")\nb = Robot("b")\na.niveau_batterie = 20\nprint(b.niveau_batterie)\nRobot.BATTERIE_CRITIQUE = 20\nprint(a.verifier_energie(), b.BATTERIE_CRITIQUE)',
        attendu: "100\nFalse 20",
        cache: true,
      },
    ],
  },
  {
    id: "c3-point",
    serie: "Ch03 : Classes et objets",
    titre: "Classe Point (de l'UML au code)",
    enonce: "Implémenter la classe <code>Point</code> (exercice 3.6) :<pre class=\"uml\">┌──────────────────────────────────┐\n│              Point               │\n├──────────────────────────────────┤\n│ + nb_points : int = 0  (classe)  │\n│ + x : float                      │\n│ + y : float                      │\n├──────────────────────────────────┤\n│ + display()                      │\n│ + distance(point) : float        │\n│ + __del__()                      │\n└──────────────────────────────────┘</pre><ul><li><code>x</code> et <code>y</code> sont optionnels et valent <code>0.0</code> par défaut. Chaque création incrémente <code>nb_points</code>.</li><li><code>display()</code> affiche les coordonnées au format <code>(x,y)</code> (sans espace).</li><li><code>distance(point)</code> renvoie la distance avec un autre <code>Point</code>.</li><li><code>__del__</code> décrémente <code>nb_points</code>.</li></ul>",
    code_depart: `import math


class Point:
    pass
`,
    solution: `import math


class Point:
    nb_points = 0

    def __init__(self, x=0.0, y=0.0):
        self.x = x
        self.y = y
        Point.nb_points += 1

    def display(self):
        print(f"({self.x},{self.y})")

    def distance(self, point):
        return math.sqrt((point.x - self.x) ** 2 + (point.y - self.y) ** 2)

    def __del__(self):
        Point.nb_points -= 1
`,
    tests: [
      { code: "p = Point(3, 4)\np.display()\nPoint().display()", attendu: "(3,4)\n(0.0,0.0)" },
      { code: "print(Point(1, 1).distance(Point(4, 5)))", attendu: "5.0" },
      { code: "a = Point()\nb = Point(1, 2)\nprint(Point.nb_points)\ndel a\nprint(Point.nb_points)", attendu: "2\n1", cache: true },
      { code: "print(round(Point(y=2).distance(Point()), 3), Point(x=-1).y)", attendu: "2.0 0.0", cache: true },
    ],
  },
  {
    id: "c3-drone",
    serie: "Ch03 : Classes et objets",
    titre: "★ Drone avec altitude maximale",
    enonce: "Écrire une classe <code>Drone</code> :<ul><li>Attributs de classe : <code>nombre_de_drones = 0</code> et <code>altitude_max = 120</code>.</li><li><code>Drone(numero)</code> : <code>altitude</code> à 0, <code>batterie</code> à 100, incrémente <code>nombre_de_drones</code>.</li><li><code>monter(hauteur)</code> : le drone monte de <code>hauteur</code> mètres <strong>sans dépasser</strong> <code>altitude_max</code>. La batterie baisse de 1 par tranche <strong>complète</strong> de 10 m réellement montés (division entière). Renvoie l'altitude atteinte.</li><li><code>decoller()</code> : si le drone est au sol, il monte de 10 m <strong>en appelant <code>monter()</code></strong>. Sinon rien ne se passe.</li><li><code>atterrir()</code> : l'altitude revient à 0.</li><li><code>est_en_vol()</code> : renvoie <code>True</code> si l'altitude est &gt; 0.</li></ul><em>Rappel : on modifie un attribut de classe via le nom de la classe.</em>",
    code_depart: `class Drone:
    pass
`,
    solution: `class Drone:
    nombre_de_drones = 0
    altitude_max = 120

    def __init__(self, numero):
        self.numero = numero
        self.altitude = 0
        self.batterie = 100
        Drone.nombre_de_drones += 1

    def monter(self, hauteur):
        nouvelle = min(self.altitude + hauteur, Drone.altitude_max)
        self.batterie -= (nouvelle - self.altitude) // 10
        self.altitude = nouvelle
        return self.altitude

    def decoller(self):
        if self.altitude == 0:
            self.monter(10)

    def atterrir(self):
        self.altitude = 0

    def est_en_vol(self):
        return self.altitude > 0
`,
    tests: [
      { code: 'd = Drone("D001")\nprint(d.est_en_vol())\nd.decoller()\nprint(d.altitude, d.batterie, d.est_en_vol())', attendu: "False\n10 99 True" },
      { code: 'd = Drone("D001")\nd.decoller()\nprint(d.monter(200), d.batterie)', attendu: "120 88" },
      { code: 'Drone.altitude_max = 50\nd = Drone("X")\nd.monter(80)\nprint(d.altitude)\nd.atterrir()\nprint(d.altitude, d.est_en_vol())', attendu: "50\n0 False", cache: true },
      { code: 'a = Drone("A")\nb = Drone("B")\na.decoller()\na.decoller()\nprint(a.altitude, b.altitude, Drone.nombre_de_drones)\nprint(a.monter(25), a.batterie)', attendu: "10 0 2\n35 97", cache: true },
    ],
  },
  {
    id: "c3-sensor",
    serie: "Ch03 : Classes et objets",
    titre: "★ Fil rouge : capteur de température",
    enonce: "Station météo, étape 2 : écrire la classe <code>TemperatureSensor</code>.<ul><li>Attributs de classe : <code>LOW_THRESHOLD = 0</code> et <code>HIGH_THRESHOLD = 35</code>.</li><li><code>TemperatureSensor(sensor_id, location, unit=\"°C\")</code> : <code>measurements</code> est une liste vide <strong>propre à chaque capteur</strong>.</li><li><code>add_measurement(value)</code> : ajoute la valeur à l'historique, puis :<ul><li>si elle dépasse le seuil haut → affiche <code>ALERTE &lt;id&gt; : &lt;value&gt;&lt;unit&gt; au-dessus du seuil haut</code></li><li>si elle est sous le seuil bas → affiche <code>ALERTE &lt;id&gt; : &lt;value&gt;&lt;unit&gt; en dessous du seuil bas</code></li></ul></li><li><code>summary()</code> : affiche <code>&lt;id&gt; (&lt;location&gt;) : dernière mesure &lt;value&gt;&lt;unit&gt;</code>, ou <code>&lt;id&gt; (&lt;location&gt;) : aucune donnée enregistrée</code>.</li><li><code>get_average()</code> : renvoie la moyenne de l'historique (<code>None</code> s'il est vide).</li></ul>",
    code_depart: `class TemperatureSensor:
    pass
`,
    solution: `class TemperatureSensor:
    LOW_THRESHOLD = 0
    HIGH_THRESHOLD = 35

    def __init__(self, sensor_id, location, unit="°C"):
        self.sensor_id = sensor_id
        self.location = location
        self.unit = unit
        self.measurements = []

    def add_measurement(self, value):
        self.measurements.append(value)
        if value > TemperatureSensor.HIGH_THRESHOLD:
            print(f"ALERTE {self.sensor_id} : {value}{self.unit} au-dessus du seuil haut")
        elif value < TemperatureSensor.LOW_THRESHOLD:
            print(f"ALERTE {self.sensor_id} : {value}{self.unit} en dessous du seuil bas")

    def summary(self):
        if len(self.measurements) == 0:
            print(f"{self.sensor_id} ({self.location}) : aucune donnée enregistrée")
        else:
            print(f"{self.sensor_id} ({self.location}) : dernière mesure {self.measurements[-1]}{self.unit}")

    def get_average(self):
        if len(self.measurements) == 0:
            return None
        return sum(self.measurements) / len(self.measurements)
`,
    tests: [
      {
        code: 's = TemperatureSensor("T1", "north")\ns.summary()\nfor v in [12, 18, 21]:\n    s.add_measurement(v)\ns.summary()\nprint(s.get_average())',
        attendu: "T1 (north) : aucune donnée enregistrée\nT1 (north) : dernière mesure 21°C\n17.0",
      },
      {
        code: 's = TemperatureSensor("T1", "north")\ns.add_measurement(40)\ns.add_measurement(-3)\ns.add_measurement(35)\nprint(len(s.measurements))',
        attendu: "ALERTE T1 : 40°C au-dessus du seuil haut\nALERTE T1 : -3°C en dessous du seuil bas\n3",
      },
      { code: 'a = TemperatureSensor("A", "north")\nb = TemperatureSensor("B", "south")\na.add_measurement(10)\nprint(b.measurements, b.get_average())', attendu: "[] None", cache: true },
      {
        code: 'TemperatureSensor.HIGH_THRESHOLD = 25\ns = TemperatureSensor("F1", "roof", "°F")\ns.add_measurement(30)\ns.summary()',
        attendu: "ALERTE F1 : 30°F au-dessus du seuil haut\nF1 (roof) : dernière mesure 30°F",
        cache: true,
      },
    ],
  },

  // ======================= S5 : Composition =======================
  {
    id: "s5-q1",
    serie: "S5 : Composition",
    titre: "Voiture et moteur",
    enonce: "La classe <code>Moteur</code> est fournie. Écrire une classe <code>Voiture</code> dont le constructeur prend un <code>Moteur</code> (attribut <code>moteur</code>) et une méthode <code>demarrer()</code> qui renvoie <code>\"Vroum (X ch)\"</code> où X est la puissance du moteur.",
    code_depart: `class Moteur:
    def __init__(self, puissance):
        self.puissance = puissance


class Voiture:
    pass
`,
    solution: `class Moteur:
    def __init__(self, puissance):
        self.puissance = puissance


class Voiture:
    def __init__(self, moteur):
        self.moteur = moteur

    def demarrer(self):
        return f"Vroum ({self.moteur.puissance} ch)"
`,
    tests: [
      { code: "v = Voiture(Moteur(110))\nprint(v.demarrer())", attendu: "Vroum (110 ch)" },
      { code: "m = Moteur(75)\nprint(Voiture(m).moteur is m)", attendu: "True" },
      { code: "print(Voiture(Moteur(300)).demarrer())", attendu: "Vroum (300 ch)", cache: true },
    ],
  },

  // ======================= S6 : Fichiers JSON =======================
  {
    id: "s6-q1",
    serie: "S6 : Fichiers JSON",
    titre: "Écrire un dictionnaire en JSON",
    enonce: "Complétez la fonction suivante pour :<ol><li>Créer un dictionnaire à partir de la clé et de la valeur passées en paramètres.</li><li>Écrire dans le fichier <code>app.json</code> l'objet JSON correspondant à ce dictionnaire.</li></ol>",
    code_depart: `import json

def write(key, value):

    f = open("app.json", "w")
`,
    solution: `import json

def write(key, value):
    d = {key: value}
    f = open("app.json", "w")
    json.dump(d, f)
    f.close()
`,
    tests: [
      { code: "write('a', 1)\nimport json\nprint(json.load(open('app.json')))", attendu: "{'a': 1}" },
      { code: "write('nom', 'Ada')\nimport json\nprint(json.load(open('app.json')))", attendu: "{'nom': 'Ada'}" },
      { code: "write('notes', [12, 15])\nimport json\nprint(json.load(open('app.json')))", attendu: "{'notes': [12, 15]}", cache: true },
    ],
  },
  {
    id: "s6-q2",
    serie: "S6 : Fichiers JSON",
    titre: "Lire un fichier JSON",
    enonce: "Écrire une fonction <code>read(nom_fichier)</code> qui renvoie le dictionnaire contenu dans le fichier JSON <code>nom_fichier</code>.",
    code_depart: `import json

def read(nom_fichier):
    pass
`,
    solution: `import json

def read(nom_fichier):
    with open(nom_fichier) as f:
        return json.load(f)
`,
    tests: [
      { code: "with open('data.json', 'w') as f:\n    f.write('{\"x\": 2}')\nprint(read('data.json'))", attendu: "{'x': 2}" },
      { code: "with open('eleve.json', 'w') as f:\n    f.write('{\"nom\": \"Lina\", \"age\": 19}')\nprint(read('eleve.json')['age'])", attendu: "19", cache: true },
    ],
  },
];
