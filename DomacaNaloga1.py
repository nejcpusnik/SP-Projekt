from math import sqrt
import csv
import itertools
import numpy as np

def avg(lst):
    return sum(lst) / len(lst)

def single(lst):
    return min(lst)

def complete(lst):
    return max(lst)

class Clustering:
    linkages = {"single": min, "complete": max, "average": avg}

    def __init__(self, file_name, linkage="average"):
        if file_name == "eurovision-semifinal.csv":
            a = 14
            b = 61
        else:
            a = 16
            b = 63

        f = open(file_name, "rt")
        self.header = f.readline().strip().split(',')[a:b]
        self.data = []  # shranjeval bo le uporabne stevilke
        self.ids = []
        self.year = []

        for line in csv.reader(f):  # gremo po vrsticah
            self.ids.append(line[:2])  # seznam imen za id
            self.data.append([float(v) if v else None for v in line[a:b]])  # izpustimo vsa imena na zacetku


        self.linkage = self.linkages[linkage]
        self.data = np.transpose(self.data)

        #print "DATA:"
        #print self.data
        #print " "
        #print self.header
        #print " "
        #print self.ids


    def row_distance(self, vektor1, vektor2):
        #vrne razdaljo dveh vektorjev

        razdalja = [(x - y) ** 2
                        for x, y in zip(self.data[vektor1], self.data[vektor2])
                        if (x is not None) and (y is not None)]
        if len(razdalja) == 0:
            return 0.0
        else:
            return sqrt(sum(razdalja) / len(razdalja))

    def cluster_distance(self, skupina1, skupina2):
        #vrne razdaljo dveh skupin

        kombinacijevrednosti = list(itertools.product(skupina1,skupina2))
        razdaljeskupin = []

        for a,b in kombinacijevrednosti:
            razdaljeskupin.append(self.row_distance(a, b))
        return avg(razdaljeskupin)

    def closest_clusters(self, listskupin):
        #vrne dve najblizji skupini
        minimal = []
        x = 0
        combinations = list(itertools.combinations(listskupin,2))

        for j in range(0, len(combinations)):
            combinations[j] = list(combinations[j])
            minimal.append(self.cluster_distance(combinations[j][0], combinations[j][1]))

        #print listskupin
        #print combinations
        #print minimal
        tmpindex = 0
        minrazdalja = minimal[0]
        for l in range(0,len(minimal)):
            if minimal[l] != 0 and minrazdalja > minimal[l]:
                minrazdalja = minimal[l]
                tmpindex = l
            else: pass
            minindex = combinations[tmpindex]

        for x in range(0,len(listskupin)):
            for y in range (1,len(listskupin)):
                if listskupin[x] == minindex[0] and listskupin[y] == minindex[1]:
                    index1 = x
                    index2 = y

        return [index1, index2]


    def run(self):
        #funkcija, ki zazene hierarhicno zdruzevanje in klice funkcijo closest_clusters, kjer se v vsakem koraku
        #while zanke poisceta 2 najblizji skupini (clustra)
        #na zacetku so vse drzave predstavlejen kot svoji clustri

        joining = []
        dendro = []
        for i in range(0, len(self.header)):
            joining.append([i])
            dendro.append([i])

        while len(joining) > 2:
            indexa = hc.closest_clusters(joining)
            tmp1 = []
            tmp2 = []
            tmp1.append(joining[indexa[0]])
            tmp2.append(dendro[indexa[0]])

            tmp1.append(joining[indexa[1]])
            tmp2.append(dendro[indexa[1]])

            joining = [x for x in joining if x not in tmp1] + [tmp1[0] + tmp1[1]]
            dendro = [x for x in dendro if x not in tmp2] + [[tmp2[0], tmp2[1]]]


        #print dendro
        self.printDendrogram(dendro, 2)

        return joining

    def printDendrogram(self, cluster, depth):
        if (len(cluster) == 1):
            print(" ") * depth,"----", self.header[cluster[0]]
        else:
            self.printDendrogram(cluster[0], depth + 2)
            print " " * (depth-2), "----"+"|"
            self.printDendrogram(cluster[1], depth + 2)

hc = Clustering("eurovision-semifinal.csv")
print "Dendrogram za glasovanje v polfinalnem delu se izrisuje..."
#hc = Clustering("eurovision-final.csv")
#print (hc.header[28] + " vs " + hc.header[38])
#print (hc.row_distance(28, 38))
#print (hc.cluster_distance([0],[2]))
#print("najmanjsa razdalja:")
#print (hc.closest_clusters())
#graphics.py
hc.run()
hc = Clustering("eurovision-final.csv")
print "Dendrogram za glasovanje v finalnem delu se izrisuje..."
hc.run()




"""najdemo dva vektorja z najmanjso razdaljo --> naredimo cluster
iscemo novo splosno najmanjso razdaljo (ne smemo ju zdruziti skupaj
znati moramo iskati razdalje med skupinami in posameznimi elementi)

za skupine: izmeriti moramo vs emozne razdalje med vsemi elementi obeh skupin
nato imamo vec opcij za vse kombinacije: average linkage, single linkage...

vsako tocko si lahko na zacetku predstavljamo kot svoj cluster

za tocke: imamo skupino(A,B) in tocko C ter tocko D --> racunamo vse kombinacije med A,B,C in A,B,D in D,C





3 opcije:
-vzamemo tabelo kot je (nic ni treba spreminjat, problem so luknje)
-vsako leto posebej (s tem lahko ugotavljamo spremembe v odnosih med drzavami)
-analiza povprecja let"""