# 📘 PEC 3 - TypeScript

Esta entrega contiene la resolución de la **PEC 3** de la asignatura **Desarrollo Front-end con Frameworks Javascript** de la UOC. El objetivo principal es la transición del desarrollo en JavaScript puro hacia **TypeScript**, dominando el tipado estático, la inferencia de tipos, la programación orientada a objetos (POO) y la transpilación de código mediante herramientas modernas como Webpack.

## 🚀 Despliegue
Puede ver y probar el ejercicio *Todo List* en el siguiente enlace:
* [*Todo List*](https://srnatsu.github.io/DFJS-PEC3/PEC3_Ej4/dist/)

## 📂 Estructura del repositorio

El proyecto sigue estrictamente la estructura de carpetas solicitada:

```text
PEC3/
├── PEC3_Ej1/
├── PEC3_Ej2/
├── PEC3_Ej3/
└── PEC3_Ej4/
```

## 📋 Descripción de los ejercicios

### 1. Conociendo TypeScript (```PEC3_Ej1```)

* Análisis comparativo entre JavaScript y TypeScript.

* Documentación teórica (```PEC3_Ej1_respuestas_teoria.md```) detallando las principales ventajas del superconjunto de Microsoft: tipado estático, prevención temprana de errores de compilación, mejor soporte de IDEs (autocompletado, refactorización segura) y escalabilidad en proyectos robustos.

* Creación de interfaces (```interface Dog```) para garantizar el cumplimiento de los contratos de datos en funciones.

### 2. Primeros códigos y tipado (```PEC3_Ej2```)

* **Inferencia de tipos:** Análisis de cómo el compilador de TS infiere automáticamente tipos (ej. ```string```, ```boolean[]```, ```(number | boolean)[])``` sin necesidad de anotarlos explícitamente (```code2.ts```).

* **Control de errores:** Documentación sobre la intercepción en tiempo de desarrollo de errores comunes (```TypeError```), reasignación de constantes, métodos de arrays incompatibles y restricciones de los tipos ```never``` y ```unknown``` (```code1.ts``` y ```code3.ts```).

* Definición teórica de la diferencia arquitectónica entre ```class``` (implementación real) e ```interface``` (contrato en tiempo de desarrollo).

### 3. Práctica de Algoritmos en TypeScript (```PEC3_Ej3```)
Resolución de tres problemas prácticos aplicando tipado fuerte:

* **```ejercicio1.ts```:** Manipulación segura de arrays (```push```, ```shift```, ```every```, ```sort```) garantizando la integridad del tipo``` <number>```.

* **```ejercicio2.ts```:** Uso de iteraciones (```for...in```) e interfaces complejas (```HangarHash``` con índices de firma de tipo ```[key: string]: Plane```) para modelar estructuras de datos anidadas.

* **```ejercicio3.ts```:** Programación Orientada a Objetos (POO). Uso de clases abstractas (```abstract class```), propiedades estáticas (```static population```), herencia (```extends```) y protectores de tipo (```instanceof```) para el polimorfismo.

* **```tsconfig.json```:** Fichero de configuración del compilador analizado y comentado línea por línea, explicando opciones como ```strict```, ```target```, ```outDir``` y la compilación ```incremental```.

### 4. Arquitectura MVC usando TypeScript (```PEC3_Ej4```)
Migración completa de la aplicación *Todo List* (basada en el patrón MVC con VanillaJS) a TypeScript puro.

* **Refactorización:** Conversión de Modelos, Vistas, Servicios y Controladores a clases fuertemente tipadas.

* **Manipulación estricta del DOM:** Uso de *Type Assertions* (```as HTMLInputElement, <HTMLElement>```) para garantizar el acceso seguro a las propiedades de los nodos del árbol DOM en la capa de la Vista.

* **Transpilación y Empaquetado:** Configuración de **Webpack** (```webpack.config.js```) y ```ts-loader``` para compilar y empaquetar de forma modular todo el ecosistema TypeScript en un único archivo optimizado para producción (bu```ndle.js```).

* Contiene un archivo ```README_PEC3_Ej4.md``` específico con las instrucciones y comandos necesarios para instalar dependencias e inicializar el servidor de desarrollo local (```webpack-dev-server```).