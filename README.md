# Blossom Hana

## Projet pour l'UE programmation web

## Initialisation de la base de données

Lancer une session mysql et entrer dans le prompt la commande suivante:
```
source path/to/BlossomHana.sql
```
`path/to/BlossomHana.sql` correspondant au chemin vers le fichier `BlossomHana.sql`
Cette commande créée la base de données et insère dedans deux utilisateurs prédéfinis, trois bouquets prédéfinis et trois fleurs prédéfinies.

## Configuration

Aller dans le fichier `config.js` et remplir les champs de `host`, `user` et `password` correspondant à votre configuration afin de vous connecter à la base de données.

## Exécution

Taper:
```
node app.js
```
La console précisera sur quel port l'application est lancé (par défaut port 8080).

## Utilisation

Deux utilisateurs sont prédéfinis dans la base de données correspondant, au vu de leurs noms, à un compte client et un compte employee, dont voici les identifiants et les mots de passes:

* Compte client:
    + Identifiant: client@mail.fr
    + Mot de passe: password
* Compte admin
    + Identifiant: admin@mail.fr
    + Mot de passe: passwordAdmin
    
Bien sur l'application intégrant une fonctionnalité d'enregistrement de nouveaux utilisateurs,
rien n'empêche d'en créer de nouveau.

## Licence

Ce logiciel est distribué sous la licence MIT
