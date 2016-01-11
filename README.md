Cet humble article a pour but de réaliser une présentation succincte des bases de Ionic et de Cordova. À travers cet article j’espère également vous montrer que le coût d'entrée dans ces technologies mobiles hybrides est faible vis à vis du gain de temps et de la simplicité d'utilisation qu'elles peuvent vous apporter. Surtout si comme moi, vous venez du monde du développement web.

### I. Ionic késako ?
<img src="https://github.com/Ballrock/ionic-presentation-part1/raw/master/img/logo_ionic.png" width="300"/> 
Ionic est un framework développé par l'entreprise [Drifty](http://drifty.com/). Il est d'ailleurs intéressant de noter qu'une grande partie de leurs membres participent également activement au développement d'Angular Material que je vous exposerai surement dans un prochain article. **Ionic est orienté vers la création d'application mobile en HTML5, JS et CSS.** Son but premier est de faciliter le travail de création d'interface et ainsi, permettre d'arriver très facilement à un rendu dit "natif" pour votre application.

Ce framework utilise également Angular pour la gestion des interactions dans l'application. Il est bien sûr possible d'utiliser uniquement le CSS de Ionic, cependant on perd dans ce cas-là l'intérêt d'un grand nombre de composants.

*Il est à noter que cette article se base sur Angular 1, des travaux sont déjà en cours coté Drifty pour le portage intégrale de Ionic sur Angular 2*

Ionic embarque Cordova (Noyau open-source de PhoneGap géré par la fondation Apache) comme dépendance et lui apporte quelques sur-couches. Par exemple, "ionic serve" qui permet de visualiser son application directement dans son navigateur avec un rafraichissement automatique. Ceux qui ont déjà travaillé sur Cordova/Phonegap ne seront pas trop perdus.

Il est à noter que ce guide est orienté vers la publication d'application Android. Certains éléments, notamment l'installation et la publication peuvent différer sur iOS, Windows Phone et autre OS.

### II. Débuter les hostilités

#### II.a. Les Installations
##### NodeJS
Tout d'abord si ce n'est pas déjà fait, je vous propose d'installer [NodeJS](https://nodejs.org/) sur votre machine. Que ce soit sur Linux (yum/apt-get) ou sur Windows (installer), NodeJS est très facile à installer.

NPM (Gestionnaire de paquet de NodeJS et Javascript en général), qui est inclus avec NodeJS, nous permettra de récupérer la plupart des outils nécessaires pour le développement de notre application. L'essayer c'est l'adopter ;)

*Note - Si vous êtes derrière un proxy il est important de configurer votre npm pour le prendre en compte. Le plus simple pour faire cela est via les variables d'environnement HTTP_PROXY et HTTPS_PROXY. Cependant il est malgré tout possible de configurer un proxy uniquement pour npm via les commandes suivantes :*

```bash
npm config set proxy  http://user_name:password@proxy.company.com:8080
npm config set https-proxy http://user_name:password@proxy.company.com:8080
```
##### Ionic et Cordova
Nous rentrons donc dans le vif du sujet, il s'agit maintenant d'installer Ionic et Cordova, pour ça rien de plus simple avec NPM :

```bash
npm install -g cordova ionic
```

That's all folks !

##### Les SDK
Nous arrivons ici dans la seule et unique difficulté de ces installations, l'installation des SDK des plate-formes. Ces SDK permettent le build de vos applications sous forme de package pour l'exécution sur le téléphone cible.

Il est toujours possible de commencer le développement sans celles-ci. Cependant, réaliser la totalité de votre développement d'application uniquement via la visualisation "Desktop" est quelque chose de très hasardeux. En effet, les plugins Cordova d'appels aux ressources du téléphone (Caméra, Network, Accéléromètre) ne sont pas chargés lors de cette visualisation. De plus, il est à mon sens important de tester les performances de votre application et la fluidité de votre interface tout au long des phases de développement.

###### Android
Le SDK Android est disponible directement sur le site officiel [Android](http://developer.android.com/sdk/installing/index.html)

*Note - Inutile d'installer toute la panoplie Android Studio dans notre cas. Malgré tout, je vous la recommande pour du développement d'application native Android*

Une fois le SDK installé, si ce n'est pas déjà le cas, il est nécessaire que tools et plateform-tools soit présents dans votre PATH.

*En cas de soucis je vous conseille de consulter la [documentation Cordova Android](http://cordova.apache.org/docs/en/edge/guide_platforms_android_index.md.html#Android%20Platform%20Guide)*

###### iOS

N'ayant pas réalisé à l'heure actuelle d'installation pour iOS, je vous redirige directement vers la [documentation Cordova iOS](http://cordova.apache.org/docs/en/edge/guide_platforms_ios_index.md.html#iOS%20Platform%20Guide)

###### WP8, Blackberry, Amazon Fire OS, Firefox OS, ...

Cordova possède des compatibilités pour de multiples OS qui sont, par transition, également compatibles avec Ionic.

Une liste plus exhaustive est disponible sur [cette page](https://cordova.apache.org/docs/en/edge/guide_support_index.md.html)

#### II.b. Initialisation d'un projet

Pour démarrer il y a plusieurs projets d'exemple dit "starter", ceux-ci sont disponibles sur le [GitHub de Drifty](https://github.com/driftyco?utf8=%E2%9C%93&query=starter). Il en existe beaucoup. Je vous conseille de faire un tour sur ce GitHub, il y a pas mal de choses qui peuvent vous aider à démarrer.

Exemple :
* tabs - Starter comportant une navigation pré-réalisée à l'aide d'onglets.
* maps - Starter présentant une gestion de Google Map.
* sidemenu - Starter avec une navigation via "sidemenu" pré-intégrée.
* blank - Starter vide.

Bien ! À présent, démarrons notre projet avec le starter blank
```bash
ionic start icysoft blank
```

Plaçons-nous dans le répertoire et ajoutons la(les) plateforme(s) voulue(s) selon l'installation que vous avez réalisée au dessus.
```bash
cd icysoft
ionic platform add ios
ionic platform add android
```

Du coté de l'architecture, les projets Ionic suivent complètement l'architecture Cordova. Comme je le disais précédemment Ionic apporte uniquement une surcouche un peu plus user-friendly et des éléments clef en main pour faciliter le travail des développeurs web/mobile. Dans le détail :

```bash
icysoft
  ├───hooks
  ├───platforms
  ├───plugins
  ├───scss
  └───www
```

- **Dossier hooks/** : Contient les scripts de "hooks" qui permettent à un moment donné du lifecycle d’exécuter des tâches. Par exemple, rajouter un script dans le dossier after_prepare permettra d'exécuter le dit script après le stade "prepare" du build.
- **Dossier platform** : Contient les données de chaque plateforme (iOS, Android, WP8, ...)
- **Dossier plugins/** : Contient les plugins Cordova. Toute utilisation d'éléments "avancés" des téléphones sortant du domaine Web (Caméra, Giroscope, Splashscreen) passent par un plugin Cordova. Pour résumer, les plugins permettent de faire le lien avec les fonctions natives du SDK de votre téléphone et le javascript de votre application. Vous pouvez trouvez un grand nombre de plugins à cette adresse : [Plugins](http://plugins.cordova.io)
- **Dossier scss/** : Contient les scripts Sass (notamment Ionic).
- **Dossier www/** : Contient votre application.

Notre projet est prêt pour les modifications à présent.

### III. Réalisation de l'application

**Note : Les sources de cet article sont disponibles sur [GitHub](https://github.com/Ballrock/ionic-presentation-part1/tree/master/exemple/icysoft)**

Le dossier www contiendra tous les éléments de notre application.

```bash
cd www
```

La commande serve nous permettra de visualiser l'application dans le navigateur tandis que l'option "--lab" permettra, elle, d'afficher en mode iOS et en mode Android (Ionic gérant un rendu natif différent pour les éléments selon l'OS, et plus spécifiquement Android et iOS)

```bash
ionic serve --lab
```

Si tout est bien allé jusqu'ici, voici donc ce que nous avons à présent.

<img src="https://github.com/Ballrock/ionic-presentation-part1/raw/master/img/serv_1.png" width="700"/>

C'est déjà pas mal mais c'est quand même un peu vide, non ? Jetons un œil plus dans le détail sur les différents éléments du dossier "www" pour voir un peu où l'on va.

```bash
www
  ├───css
  │   └───style.css
  ├───img
  ├───js
  │   └───app.js
  ├───lib
  │   └───ionic
  └───index.html
```
- **Fichier index.html** : C'est le point d'entrée dans notre application; Il regroupe tous les imports et l'initialisation de la structure Ionic. Je conseille de garder ce fichier le plus simple possible et de gérer tout le reste sous forme de template et de route angular.
- **Fichier app.js** : Ce fichier contient les premiers modules angular.
- **Dossier css/ et img/** : Pas trop besoin d'un dessin ici, ces dossiers nous permettront de stocker les feuilles de styles css et les images.
- **Dossier lib/** : À la création du projet, Bower est paramétré pour envoyer les nouvelles librairies Javascript ici (voir .bowerrc à la racine du projet).

Comme je l'ai dit plus haut, nous allons effectivement utiliser angular pour le développement de notre application (on peut même inclure [ng-Cordova](http://ngcordova.com/) pour joliment wrapper les plugins Cordova).

#### III.a. Mise en place de la base
##### Créations

Comme je l'indiquais à l'instant nous allons utiliser un système de template. Commençons par ajouter un nouveau dossier qui contiendra nos templates et dans notre cas, plus précisément, deux fichiers base.html (le wrapper) et icysoft.html (page de présentation). Dans un second temps nous créerons un fichier controller.js qui contiendra comme son nom l'indique notre controller AngularJS :

```bash
www
  ├───css
  ├───img
  ├───js
  │   │───app.js
  │   └───controller.js
  ├───lib
  ├───tpl
  │   │───accueil.html
  │   └───base.html
  └───index.html
```

Le fichier base.html est assez simple, il comporte la description des tabs de l'application ainsi que les pages/liens associés. Il sert en gros à wrapper le contenu de toutes les pages et leur ajouter un header/footer. Vous retrouverez ce genre de fonctionnement dans les starter tabs.

```html
<ion-tabs class="tabs-striped tabs-top tabs-background-positive tabs-color-light">
  <!-- Tab Accueil -->
  <ion-tab title="Icysoft" icon-off="ion-ios-snowy" icon-on="ion-ios-snowy" href="#/icysoft/accueil">
    <ion-nav-view name="accueil"></ion-nav-view>
  </ion-tab>
</ion-tabs>
```
Classe CSS :
- *tabs-striped* : Tabs de type "striped"
- *tabs-top* : Permet de bloquer la liste d'icônes en haut. Dans le cas contraire Ionic definit le positionnement selon l'OS.
- *tabs-background-positive* : Couleur du fond de type "positive"
- *tabs-color-light* : Couleur du texte (icônes) de type "light"

Le fichier accueil.html est le contenu de notre page, pour l'exemple j'ai pris un élément Ionic de type [Card Showcase](http://ionicframework.com/docs/components/#card-showcase) mais il est tout à fait possible de faire à votre guise.

```html
<ion-view view-title="Icysoft">
  <ion-content>
  ...
  </ion-content>
</ion-view>
```
Le fichier controller.js contient uniquement le controller de la page accueil.html, donc nous n'aurons effectivement pas grand chose ;).

```javascript
'use strict';

angular.module('controller', [])
.controller('AccueilCtrl', function($scope) {});
```

Vous remarquerez que j'ai ajouté la mention 'use strict'. Elle n'est pas présente de base dans les fichiers des starter Ionic.

##### Modifications

Maintenant, attaquons les modifications de app.js et index.js. D'une manière générale j'ai renommé les différents controllers/modules du starter blank pour que cela colle un peu mieux avec notre micro-projet.

Modifions le fichier index.html afin qu'il devienne plus générique et puisse accueillir notre nouveau système de template. On importe également le fichier controller.js afin que celui-ci puisse être appelé dans notre module.

```html
<script src="js/controller.js"></script>

...

<body ng-app="icysoft">
  <ion-nav-bar class="bar-positive">
  </ion-nav-bar>

  <ion-nav-view></ion-nav-view>
</body>

```
La balise *ion-nav-bar* servira, comme son nom l'indique, à afficher la barre de navigation contenant le titre en haut. Tandis que de son coté la balise *ion-nav-view* va nous permettre d'encapsuler du contenu.

Classe CSS :
- *bar-positive* : Colorisation "positive" de la barre de titre en haut.

Nos dernières modifications concernent le fichier app.js qui est le cœur de notre application et contient le module Angular "icysoft".

```js
'use strict';

angular.module('icysoft', ['ionic','controller'])

...

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('base',
  {
    url:'/icysoft',
    abstract: true,
    templateUrl: 'tpl/base.html'
  })
  .state('base.icysoft',
  {
    url: '/accueil',
    views: {
      'accueil': {
        templateUrl: 'tpl/accueil.html',
        controller: 'AccueilCtrl'
      }
    }
  });
  $urlRouterProvider.otherwise('/icysoft/accueil');
});
```
Ici nous avons ajouté un .config qui contient tout notre paramétrage de routage pour l'application. Rien de bien compliqué ici, on ajoute deux états : le premier, abstrait, sera notre template *base* qui contient nos tabs. Tandis que le second représentera lui, notre accueil. Pour finir on définit une route par défaut.

#### III.b. Tests Web

Maintenant que notre petite application est prête nous pouvons voir ce que ça donne.

```
ionic serve --lab
```

Et voici le résultat :

<img src="https://github.com/Ballrock/ionic-presentation-part1/raw/master/img/serv_2.png" width="700"/>

Il est possible d'utiliser votre debuggueur de navigateur habituel pour vérifier le fonctionnement de votre application comme pour n'importe quelle page web.

#### III.c. Tests mobile (Android)

Passons maintenant aux tests sur mobile. Comme je l'ai expliqué avant, il est nécessaire de voir le résultat de l'application dans des conditions réelles afin de s'assurer que tous nos développements sont fonctionnels. Pour cela il y a deux moyens d'arriver à nos fins : tester sur un émulateur (avec tous les inconvénients, principalement de performance, que cela peut impliquer) ou directement sur votre téléphone.

Pour que le test fonctionne sur votre téléphone il est nécessaire que celui-ci soit en mode *USB debugging* et que les drivers adb soient installés sur votre machine. Vous trouverez des informations intéressantes sur ce sujet [ici](http://cordova.apache.org/docs/en/edge/guide_platforms_android_index.md.html#Android%20Platform%20Guide)

```
ionic run android
```
Dans le cas où votre téléphone n'est pas disponible, ionic/cordova tentera de lancer un émulateur Android pour exécuter l'application.

<div style="display:flex">
     <div style="flex:1;padding-right:5px;">
          <img src="https://github.com/Ballrock/ionic-presentation-part1/raw/master/img/phone_1.png" width="300">
     </div>
     <div style="flex:1;padding-left:5px;">
          <img src="https://github.com/Ballrock/ionic-presentation-part1/raw/master/img/phone_2.png" width="300"/>
     </div>
</div>

Il est également possible de debugguer votre application directement sur votre téléphone via plusieurs solutions. Personnellement je vous recommande *chrome://inspect*. Celui-ci permet d'utiliser le debuggueur Chrome directement dans votre téléphone. Pour paramétrer votre téléphone et votre Chrome je vous conseille de vous référer à cet [article Google](https://developer.chrome.com/devtools/docs/remote-debugging).

### IV. Préparation à la publication (Android)

Maintenant que nos tests sont concluants, nous allons pouvoir packager notre version pour la publier, pour cela nous allons tout d'abord réaliser la compilation en mode release de notre application.

```
ionic build --release android
```

Il est à noter que cette commande exécute en réalité *cordova build --release android*.
Le build s'occupe de générer un package .APK non signé contenant tous les éléments de notre application. Cet APK se trouve au chemin suivant *platforms/android/ant-build*. L’intérieur du package est constitué de deux grands dossiers :
- *res/* qui contient nos ressources hors application Cordova, notamment les icônes et splashscreen. Quelques ressources nécessaires au fonctionnement des plugins Cordova y sont également situées.
- *assets/www* qui représente le contenu de notre dossier www avec les JS Cordova en plus.

Comme je l'ai dit juste au dessus l'APK actuel n'est pas signé, hors il est nécessaire pour la publication que celui-ci le soit. Pour cela nous allons générer une clé, celle-ci est à garder précieusement, sans elle il sera impossible de publier de futures mises à jour de notre application sur le Store.

```
keytool -genkey -v -keystore icysoft-release.keystore -alias icysoft -keyalg RSA -keysize 2048 -validity 10000
```

*keytool est compris dans les binaires de tous les JDK*.
On utilise une clé 2048 bits pour une validité de 10000 jours (ça devrait suffire ^^).

Avec cette clé nous allons signer notre jar. Comme pour keytool, jarsigner est compris dans les binaires de tous les JDK.

```
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore icysoft-release.keystore CordovaApp-release-unsigned.apk icysoft
```

Pour finir nous allons utiliser un aligner pour optimiser et préparer l'archive pour le store. Pour cela nous allons utiliser zipalign qui est contenu dans les binaires du SDK Android.

```
zipalign -v 4 CordovaApp-release-unsigned.apk Icysoft.apk
```

Et voila ! Nous avons notre APK prêt à être mis sur le store pour faire des millions de downloads !

### IV. Conclusion

Nous avons pu voir dans cet article les bases de Cordova et de Ionic, il est bien sur possible d'aller beaucoup plus loin avec ces Frameworks mais nous pourrions en parler des heures ^^.
Nous avons tout de même pu voir que l'on peut obtenir un résultat "natif-like" très rapidement avec Ionic, et c'est bien là tout le but ce framework, réduire au maximum le temps de développement des applications multi-plateformes.