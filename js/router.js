
class Router {
    constructor(paths) {
        this.paths = paths;
        this.initRouter();
    }
    initRouter() {
        const { location: { pathname = "/" } } = window;
        const URL = pathname === "/" ? "inicio" : pathname.replace("/", "");
        this.load();
    }

   
    async load(page = "inicio") {
        console.log(page)
        const { paths } = this;
        const { script, template } = paths[page]       
        const $CONTAINER = document.querySelector("#container");
        // creo que aca devuelve una promesa que le pasa el contenido "content" al html
        const html = await fetch(template).then(response => response.text())
        $CONTAINER.innerHTML = html;        
        sessionStorage['paginaActual'] = page
       // Logeado();
        console.log(page);
        await script()
    }
}