# ESIR2 - Projet JXT

Le but des dernières séances de travaux pratiques était de réaliser les micro-services décrits dans l'architecture ci-dessous.

<p align="center">
  <img src="https://github.com/stfanmichel/ESIR-TP5-SUBJECT/raw/master/sujetglobal.png" alt="Schéma global du projet"/>
</p>

Le **premier service** (trouvable au sein du dossier TP5 à la racine du projet) gère la dimension authentification :
- Gestion statique des utilisateurs (pas de persistence de données post-exécution)
- Attribution et validation des tokens JWT
Toutes les fonctionnalités implémentées sont accessibles 
via requêtes orientées vers l'API REST dont la documentation est trouvable 
[ici](https://github.com/stfanmichel/ESIR-TP5-SUBJECT/blob/master/Swagger_Authentication_API.yaml)

```
git clone https://github.com/Theomariee/WEB_TPs.git
cd TP5
npm i
npm start
npm test
```


Le **deuxième service** (trouvable au sein du dossier TP6 à la racine du projet) 
gère la manipulation (**C**reate, **R**etrieve,**U**pdate, **D**elete) d'objets *Alerts* avec les fonctionnalités métier imposées
par les spécifications initiales.
Cette fois, la persistence des données s'effectue avec MongoDB, au travers du driver Mongoose.
Une nouvelle fois, les opérations CRUD sont exposées via l'API, conformément à la documentation disponible
[ici](https://github.com/benco1967/cours-esir-2019/blob/master/swagger/alerts.swagger.yml)
Ce service s'appuie sur la partie authentification (notamment la génération de tokens JWT) afin de pouvoir autoriser 
les accès aux différentes opérations spécifiées.

```
git clone https://github.com/Theomariee/WEB_TPs.git
cd TP6
npm i
npm start
npm test
```

