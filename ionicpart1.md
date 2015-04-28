# Ionic - Partie 1
### I. Ionic késako ?
<img src="./img/logo_ionic.png" width="200"/>

Ionic est un framework développé par l'entreprise [Drifty](http://drifty.com/). Il est d'ailleurs interressant de noter qu'une grande partie de leurs membres participe également activement au developpement d'Angular Material que je vous exposerais surement dans un prochain article. Ionic est orienté vers la création d'application mobile en HTML5, JS et CSS. Son but premier est de facilité le travail de création d'Interface et ainsi, il permet d'arriver très facilement à un rendu dit "natif" pour votre application.

Ce framework utilise également Angular pour la gestion des interactions dans l'application. Il est bien sur possible d'utiliser uniquement le CSS de Ionic cependant vous perdez dans ce cas là l'interet de plusieurs composants.

Ionic embarque Cordova (Noyau open-source de PhoneGap géré par la fondation Apache) comme dépendance et lui apporte quelques surcouches. Par exemple, "ionic serve" qui permet de visualiser son application directement dans son navigateur avec un rafraichissement automatique. Ceux qui ont déjà travaillé sur Cordova/Phonegap ne seront pas trop perdus.

### II. Ok ! On demarre quand ?

#### II.a. Les Installations
##### NodeJS
Tout d'abord si ce n'est pas déjà fait, je vous propose d'installer [NodeJS](https://nodejs.org/) sur votre machine. Que ce soit sur Linux (yum/apt-get) ou sur Windows (installer), NodeJS est très facile à installer.

NPM (Gestionnaire de paquet de NodeJS et Javascript en général) nous permettra de récupérer la plupart des outils necessaires pour le developpement de notre application. Vous ne pourrez rapidement plus vous en passer ;)

*Note - Si vous êtes derrière un proxy il est important de configurer votre npm pour le prendre en compte :*
```bash
npm config set proxy  http://user_name:password@proxy.company.com:8080
npm config set https-proxy http://user_name:password@proxy.company.com:8080
```
##### Ionic et Cordova
Nous rentrons donc dans le vif du sujet, il s'agit maintenant d'installer Ionic et Cordova, pour ça rien de plus simple avec NPM :

```bash
npm install -g cordova ionic
```

That's all folk !

##### Les SDK
Nous arrivons ici dans la seule et unique difficultée de ces installations, l'installation des SDK des platformes. Ces SDK permettent seulement le build de vos applications sous forme de package pour l'exécution sur le téléphone cible.
Il est donc toujours possible de commencer le développement sans celles-ci, cependant réaliser tout le developpement d'une application uniquement via la visualisation "Desktop" est quelque chose d'hasardeux. En effet les plugins Cordova d'appels aux ressources du téléphone (Caméra, Network, Acceleromètre) ne sont pas chargé lors de cette visualisation. De plus il est, à mon sens, important de tester les performances de votre application et la fluidité de votre interface tout au long des phases de developpement.

###### Android
Le SDK Android est disponible directement sur le site officiel [Android](http://developer.android.com/sdk/installing/index.html)

*Note - Inutile d'installer toute la panoplie Android Studio dans notre cas, cependant je vous la recommande pour du développement d'application native Android*

Une fois le SDK installé, si ce n'est pas le cas, il est necessaire que tools et plateform-tools soit présent dans votre PATH.

###### iOS
###### WP8

#### II.b. Initialisation d'un projet

Pour démarrer il y a plusieurs projets d'exemple dit "starter", ceux-ci sont disponibles sur le [GitHub de Drifty](https://github.com/driftyco?utf8=%E2%9C%93&query=starter). Il en existe beaucoup je vous conseille de faire un tour sur ce GitHub, il y a pas mal de choses qui peuvent vous aider à démarer.

Exemple :
* tabs - Starter comportant une navigation pré-réalisé à l'aide d'onglets.
* maps - Starter présentant une gestion de Google Map.
* sidemenu - Starter avec une navigation via "sidemenu" pré-intégré.
* blank - Starter vide.

Commençons par démarrer notre projet avec le starter blank
```bash
ionic start icysoft blank
```

Plaçons-nous dans le repertoire et ajoutons la plateforme voulue selon l'installation faite au dessus.
```bash
cd icysoft
ionic platform add ios
ionic platform add android
```

Du coté de l'architecture, les projets Ionic suivent completement l'architecture Cordova. Comme je le disait précédemment Ionic apporte uniquement une surcouche un peu plus user-friendly et des élements clef en mains pour faciliter de travail des developpeur web/mobile.

```bash
icysoft
  ├───hooks
  ├───platforms
  ├───plugins
  │   ├───com.ionic.keyboard
  │   ├───org.apache.cordova.console
  │   └───org.apache.cordova.device
  ├───scss
  └───www


```

- **Dossier hooks** : Contient les scripts de "hooks" qui permettent à un moment donné du lifecycle d'executer des taches. Par exemple, rajouter un script dans le dossier after_prepare permettra d'exécuter le dit script après le stade "prepare".
- **Dossier platform** : Contient les données de chaque plateform (iOS, Android, WP8, ...)
- **Dossier plugins** : Contient les plugins cordova. Toutes utilisation d'éléments "avancés" des téléphones sortant du domaine Web (Caméra, Giroscope, Splashscreen) passent par un plugin cordova. En somme, les plugins permettent de faire le lien avec les fonctions natives et le javascript de votre application.
- **Dossier scss** : Contient les scripts Sass (notamment Ionic).
- **Dossier www** : Contient votre application.

Notre projet est prêt pour les modification à present

### III. Commençons notre application

##### Note : Les source de cet article sont disponibles sur le repo github suivant

Le dossier www contiendra tous les éléments de notre application.

```bash
cd www
```

La commande serve nous permettra de visualiser l'application dans le navigateur et, la petite specificité "--lab" permettra elle, d'afficher en mode iOS et en mode Android (Le rendu des éléments n'étant pas identique sur les deux OS)

```bash
ionic serve --lab
```

Si tout est bien allé jusqu'ici, voici donc ce que nous avons à present.

<img src="./img/serv_1.png" width="700"/>

C'est déjà pas mal mais c'est quand même un peu vide je trouve, jetons un oeil plus dans le détail sur les différents éléments du dossier "www" pour voir un peu où l'on va.

```bash
www
  ├───css
  ├───img
  ├───js
  │   └───app.js
  ├───lib
  │   └───ionic
  └───index.html
```
*index.html* est le point d'entrée dans notre application il regroupe tous les imports et l'initialisation de la structure Ionic. Je conseille de garder ce fichier le plus simple possible et de gerer tous le reste sous forme de template et de route angular. Et oui ! Comme je l'ai dit plus haut, nous allons utiliser angular pour joliment wrapper les plugins cordova) pour le developpement de notre application (on peut même inclure [ng-Cordova](http://ngcordova.com/).

Bien ! Demarrons à présent, comme je l'indiquais à l'instant nous allons utiliser un systeme de template commençons par rajouter un nouveau dossier qui contiendra nos templates et deux fichier qui contiendra notre header qui sera interactif et notre page de base :

```bash
www
  ├───css
  ├───img
  ├───js
  │   └───app.js
  ├───lib
  │   └───ionic
  ├───tpl
  │   │───header.hml
  │   └───base.hml
  └───index.html
```
