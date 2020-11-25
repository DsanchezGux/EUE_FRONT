## Proyecto Base React - Redux - Typescript - Ducks

En este proyecto se implementa el patrón ducks, para Redux con un ejemplo básico del flujo de autenticación, también se sugiere como regla la modularización de todos los componentes que se puedan reutilizar, un componente se considera reutilizable cuando lo has usado más de 2 veces en un solo proyecto.

Como regla general se sugiere nombrar archivos, clases funciones y métodos en ingles y solo los comentarios en español.


### `Requerimientos de un componente reutilizable`

* Se deben definir los Props types en el componente con el tipado y si es requerido o no.
* No debe tener texto plano internamente todo lo que muestre debe ser dinámico y obtenido desde los props, a menos que sea un texto que nunca va a cambiar.
* Para componentes de maquetación deben recibir props como color, border radius, ancho, etc, dependiendo de lo que necesite, con el fin de que no tenga estilos estéticos y se pueda adaptar a cualquier situación.

### `Estructura de Carpetas`

La estructura está definida de acuerdo al estándar obtenido en reuniones internas, 
a continuación se deja una breve description de lo que debe haber dentro de cada carpeta:

* assets: dentro de esta estaran las imagenes y archivos de estilos globales, librerías de estilos como por ejemplo bootstrap, se deben importar en el archivo main.scss.

* components: aquí van los componentes reutilizables de la aplicación, solo se deben colocar con las indicaciones que se mencionaron en el punto anterior, y servirán para ser utilizados en cualquier parte del proyecto, se puede subdividir esta carpeta para mayor orden  para clasificarlos por ejemplo UI > modas, buttons, cards, alerts, FORMS > selects, etc.

* languages: aqui iran los archivos de lenguaje aún no se define si en formato .json o en el mismo formato tsx, pero su nomenclatura debe es el símbolo del lenguaje y la extensión, ejemplo es.json, en.json.

* layout : aqui ira el contenedor principal de la aplicación , comprendería generalmente de 
header, main, footer, (sidebar en caso de requerir)

* pages: aqui estaran todas las secciones de la aplicacion subdivididas por grupos y con la primela letra en mayuscula, ejemplo: Auth > Login.tsx, Register.tsx, Forgotpassword.tsx, etc.

* redux: dentro de esta carpeta se agregara la estructura redux con el patrón ducks, se dejara un ejemplo simple del patrón con el duck auth para que sirva de base 

* routes: aqui estara el archivo central de rutas con su lógica para las rutas públicas y privadas

* utils: aquí se agregaran las funciones o métodos reutilizables en la aplicación se pueden subdividir si es necesario por grupos de funciones


### `Estilos SCSS`

Para los estilos se decidió usar sass con extensión .scss se manejan los estilos globales únicamente para las clases que sean reutilizables, al igual que los mixins, del resto cada componente tendrá su propio archivo de estilos con el formato de nombre siguiente : 
Nombrearchivo.module.scss (esto es una regla que pide react), y se utilizada de la siguiente forma: 

`import classes from ‘./nombrearchivo.module.scss`

`<div className={classes.main}> Hola mundo </div>`

### `Snipets para vscode`

vscode nos ofrece crear snippets para la generación de código rápido, entonces como buena práctica se propone ir creando los estándares GUX y esas estructuras repetitivas, guardarlas en un snippet y asi solo escribirlo y generar el código, como por ejemplo en los componentes.

#### `Functional compoent con patron Redux connect`

``` "Create Page Function Component": {"
    "prefix": "cra-comp-redux",
    "body": [
    "import React from 'react';",
    "import { connect } from 'react-redux';",
    "import { Dispatch } from 'redux';",
    "import classes from './$1.module.scss';",

      "const $1 = () => {",
      "return <div className={classes.main}>$1</div>;",
      "};",

      "const mapStateToProps = (state: any) => {",
      "return {};",
      "};",

      "const mapDispatchToProps = (dispatch: Dispatch) => {",
      "return {};",
      "};",

      "export default connect(mapStateToProps, mapDispatchToProps)($1);"
    ]
  }
```

### Plugins Recomendados para vsCode

* Para los Ducks en redux recomiendo este plugin, crea toda la estructura del duck, solo le debes pasar el nombre y despues los actions, esta bastante bueno

  * https://marketplace.visualstudio.com/items?itemName=Bespohk.ducks-typescript-generator

### Este documento sigue en desarrollo
