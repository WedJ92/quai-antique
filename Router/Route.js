export default class Route {
    constructor(url, title, pathHtml, authorize = [], pathJS = "") {
        this.url = url;
        this.title = title;
        this.pathHtml = pathHtml;
        this.pathJS = pathJS;
        this.authorize = authorize;
    }
}

/*
[] -> Tout le monde peut y accéder
["disconnected"] -> Réservé aux utilisateurs déconnectés
["client"] -> Réservé aux utilisateurs avec le rôle client
["admin"] -> Réservé aux utilisateurs avec le rôle admin
["admin", "client"] -> Réservé aux utilisateurs avec le rôle client OU admin
*/