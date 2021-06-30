// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las 
// implementaciones ya realizadas en las homeworks de 
// Queue, LinkedList y BinarySearchTree.
// Sobre dichas implementaciónes van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo.
// Pero todos los métodos ya implementados en las homeowrks no es 
// necesario que los vuelvan a definir.

const {
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
} = require('./DS.js');


// ----- Closures -----

// EJERCICIO 1
// Implementar la funcion 'exponencial' que recibe un parametro entero 'exp'
// y retorna una funcion, nos referiremos a esta ultima como funcion hija,
// y a 'exponencial' como la funcion padre, la funcion hija debe de recibir 
// un parametro y retornar dicho parametro elevado al parametro 'exp' de 
// la funcion padre original 'exponencial'
// Ejemplo:
// > var sqrt = exponencial(2);
// > exponencial(2);
// < 4
// > sqrt(3);
// < 9
// > sqrt(4);
// < 16
 
function exponencial(exp) {              
    
    return function hija(x) {
        return  x**exp;
    }
}    



// ----- Recursión -----

// EJERCICIO 2
// Crear la funcion 'direcciones':
// La funcion debe retornar un string de los movimientos Norte(N), Sur(S), Este(E), Oeste(O)
// que se deben realizar, para llegar al destino de un laberinto dado.
//
// Ejemplo: dado el siguiente laberinto:
// let laberintoExample = {
//     N: 'pared',
//     S: {
//         N: 'pared',
//         S: 'pared',
//         E: {
//             N: 'destino', ==> SEN
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         },
//         O: {
//             N: 'pared',
//             S: 'pared',
//             E: 'pared',
//             O: 'pared'
//         }
//     },
//     E: 'pared',
//     O: 'pared'
// }
// El retorno de la funcion 'direcciones' debe ser 'SEN', ya que el destino se encuentra
// haciendo los movimientos SUR->ESTE->NORTE
// Aclaraciones: el segundo parametro que recibe la funcion r prop') puede ser pasado vacio (null)
function direcciones(laberinto, camino ="") {
    if(!laberinto) return "";

    for (let puntoCardinal in laberinto){  
        if(typeof (laberinto[puntoCardinal]) === "object"){
            camino += puntoCardinal;//suma la key;
            return  camino + direcciones(laberinto[puntoCardinal]);//Y hace recursion desde ese value;
        }
        if(laberinto[puntoCardinal] === "destino"){//Si no hay un objeto, es porque llego al final;
            return camino = camino + puntoCardinal;
        }
    };
    return ""; //Laberinto sin destino retorna "".
};


// EJERCICIO 3
// Crea la funcion 'deepEqualArrays':
// Dado que las comparaciones en javascript aveces son un problema como con el siguiente ejemplo:
// [0,1,2] === [0,1,2] => false // puede probarlo en la consola
// con objetos o arrays identicos surge la necesidad de comparar en 'profundidad' arrays u objetos
// en este caso la funcion solo va a ser pensada para recibir arrays,
// pero estos pueden tener multiples niveles de anidacion, y la funcion deepEqualArrays debe
// comparar cada elemento, sin importar la profundidad en la que este
// Ejemplos: 
// deepEqualArrays([0,1,2], [0,1,2]) => true
// deepEqualArrays([0,1,2], [0,1,2,3]) => false
// deepEqualArrays([0,1,[[0,1,2],1,2]], [0,1,[[0,1,2],1,2]]) => true

function deepEqualArrays(arr1, arr2) {
//Debo return true o false si los arrays son iguales o no. 
//1ro comparo el largo de ambos.
//2do si son del mismo tipo typeOf, no  hace falta! porque..  == el doble igual compara valores (1 =="1"--> true ). 
// El === tambien chequea que sean el mismo tipo de datos (1 === "1" => false). 
//3ro Comparo que el atraves de un for si ambos indices son iguales.
//4to Si son distintos
//5to Si ambos son array. utilizo instanceof.(Comparo si son array ambos, si lo son hago la recursividad deepEqualArrays).
// (Hay que utilizar una bandera, empieza en false. Pero por defecto es true en el argumento).
    if(arr1.length != arr2.length) return false;    
    let bandera = false;    
    for(let i = 0; i < arr1.length; i++){//Necesito un solo "for" para compararlos..
        if(typeof arr1[i] === 'object'){//Si en esta parte del arr1, tengo otro arr(o un obj)..
            for(element in arr1[i]){//Comienzo a iterar sobre ese objeto-array "interno".
                if(arr1[i][element] === arr2[i][element]){
                    bandera = true;
                }
                else{
                    bandera = false;//Retorna false, porque los subelementos no son iguales.
                }    
            }
        }
        else if(arr1[i] === arr2[i]){//Si no hay arrays anidados..
            bandera = true;
        }
    };
    return bandera;
}
// [0,1,[[0,1,2],1,2]], => [1, 2, [1, 2, [0, 1, 2]]]   =>Se comporta como objeto=> [1, 2, {0:1, 1:2, {0:0, 1:1, 2:2}}];  
// [0,1,[[0,1,2],1,2]                 


// ----- LinkedList -----

// Deben completar la siguiente implementacion 'OrderedLinkedList'(OLL)
// que es muy similar a las LinkedList vistas en clase solo que 
// los metodos son distintos y deben de estar pensados para conservar la lista
// ordenada de mayor a menor.
// ejemplos:
// head --> 5 --> 3 --> 2 --> null
// head --> 4 --> 3 --> 1 --> null
// head --> 9 --> 3 --> -1 --> null
// Las dos clases principales ya van a estar implementadas a continuacion:
function OrderedLinkedList() {
    this.head = null;
}
// notar que Node esta implementado en el archivo DS

// Y el metodo print que permite visualizar la lista:
OrderedLinkedList.prototype.print = function(){
    let print = 'head'
    let pointer = this.head
    while (pointer) {
        print += ' --> ' + pointer.value
        pointer = pointer.next;
    }
    print += ' --> null'
    return print
}

// EJERCICIO 4
// Crea el metodo 'add' que debe agregar nodos a la OLL de forma que la misma se conserve ordenada:
// Ejemplo:
// > LL.print()
// < 'head --> null'
// > LL.add(1)
// > LL.print()
// < 'head --> 1 --> null'
//    2       c
// > LL.add(5)
// > LL.print()
// < 'head --> 5 --> 1 --> null'
// > LL.add(4)
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
//               
 
OrderedLinkedList.prototype.add = function(value){
    var node = new Node(value);
    let current = this.head;

    //Casos: Lista vacia, add al principio de la lista, en el medio, agregar al final?
    if(!current){
        this.head = node;
        return;
    }    
    //Add al principio de la lista.
    if(current.value < node.value){
        let aux = current;
        current = node;
        node.next = aux;
        return;   
    };

    while(current.next){
        if(current.next.value > node.value){//El siguiente valor es mas grande que el node value => avanza.
            current = current.next
        }
        if(node.value > current.next.value){//El siguiente valor es mas chico que el node value => introducite.
            let aux = current.next;
            current.next = node;
            node.next = aux;
            return
        }
    }
    current.next = node;
    return;      
}

// OrderedLinkedList.prototype.add = function (val) {

//     current = this.head;
//     node = new Node(val);

//     if (!this.head) {
//         this.head = node;
//         //        this._length++;
//         return node;
//     }

//     if (val > current.value) {
//         node.next = current;
//         this.head = node;
//         //        this._length++;
//         return node;
//     }

//     while (current.next && !(val < current.value && val > current.next.value)) {
//         current = current.next
//     }
//     var aux = current.next
//     current.next = node
//     node.next = aux
//     return node;
// }
    
// EJERCICIO 5
// Crea el metodo 'removeHigher' que deve devolver el valor mas alto de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < null

OrderedLinkedList.prototype.removeHigher = function(){
    let current = this.head;
    if(!current){
        return null;
    }
    //Funciona solo porque la lista está ordenada => H --> 5 --> 4 --> 1 --> null;
    let val = current.value;
    this.head = current.next;
    return val;    
}
/*Metodo para saber cual es el mas grande (no los saca de la linked).
let current = this.head;
    if(!current){
        return null;
    }
while(!!current.next){
    container.push(current);
    current = current.next;
}
let max = 0;
for(let i = 0; i < container.length; i++){
    if(container[i] > max){
        max += container[i]
    }
}
return max;
*/

// EJERCICIO 6
// Crea el metodo 'removeLower' que deve devolver el valor mas bajo de la linked list 
// removiendo su nodo corresponidente:
// Ejemplo:
// > LL.print()
// < 'head --> 5 --> 4 --> 1 --> null'
// > LL.removeHigher()
// < 1
// > LL.removeHigher()
// < 4
// > LL.removeHigher()
// < 5
// > LL.removeHigher()
// < null

//MISMO CODIGO QUE REMOVE LAST - SOLO FUNCIONA CON UNA LISTA ORDENADA DE > a <.
OrderedLinkedList.prototype.removeLower = function(){
    current = this.head; 
    if(!current){
         return null;
    }
    //Cuando hay solo un nodo en la lista.
    if(current.next === null){ 
        var aux = current.value;
        this.head = null;
        return aux;
    }
    while(current.next.next){
        current = current.next;
    }
    aux = current.next.value;
    current.next = null;
    return aux;
}
//METODO PARA DEJAR EL PRIMERO Y EL ULTIMO EN UNA LISTA.
/*  while(current.next.next){
        aux = current.next;
        current.next = null;
        return aux;
    }    
*/         

// ----- QUEUE -----

// EJERCICIO 7
// Implementar la funcion multiCallbacks:
// la funcion multiCallbacks recibe dos arrays de objetos cuyas propiedades son dos,
// 'cb' que es una funcion, y 'time' que es el tiempo estimado de ejecucion de dicha funcion 
// este ultimo representado con un integer como se muestra acontinuacion:
// let cbsExample = [
//     {cb:function(){}, time: 2},
//     {cb:function(){}, time: 3}
// ]
// De manera que lo que nuestra funcion 'multiCallbacks' debe de ir ejecutando las funciones 
// sin pasarle parametros pero debe ir alternando las funciones de cbs1 y cbs2 
// segun cual de estas se estima que tarde menos, retornando un arreglo de resultados
// de las mismas en el orden que fueron ejecutadas
// Ejemplo:
// > let cbs1 = [
//       {cb:function(){return '1-1'}, time: 2},
//       {cb:function(){return '1-2'}, time: 3}
//   ];
// > let cbs2 = [
//       {cb:function(){return '2-1'}, time: 1},
//       {cb:function(){return '2-2'}, time: 4}
//   ];
// > multiCallbacks(cbs1, cbs2);
// < ["2-1", "1-1", "1-2", "2-2"];

function multiCallbacks(cbs1, cbs2){
    let arr = [];
    for(element in cbs1){
        for(element in cbs2){
            if(typeof element === 'function'){            
                setTimeout(function() { arr.push(element(cb)); }, element[time]);
            }                      
        }            
    };
    return arr;     
} 
// function printing() {
//     console.log(1);
//     setTimeout(function() { console.log(2); }, 1000);
//     setTimeout(function() { console.log(3); }, 0);
//     console.log(4);
//  }
 


// ----- BST -----

// EJERCICIO 8
// Implementar el metodo 'toArray' en el prototype del BinarySearchTree
// que devuelva los valores del arbol en una array ordenado
// Ejemplo:
//     32
//    /  \
//   8   64
//  / \
// 5   9
// resultado:[5,8,9,32,64]

BinarySearchTree.prototype.toArray = function(order, array=[]) {
    if(order === 'in-order'|| !order){
        if(this.left){
            this.left.toArray(order, array);
       }
       if(this.value){
           array.push(this.value);
       }
       if(this.right){
           this.right.toArray(order, array);
       }
    }
    return array;
}


// ----- Algoritmos -----

// Ejercicio 9
// Implementar la funcion 'primalityTest' que dado un valor numerico entero
// debe de retornar true or false dependiendo de si este es primo o no.
// Puede que este es un algoritmo que ya hayan implementado pero entenderan
// que es un algoritmo que segun la implementacion puede llegar a ser muy costoso
// para numeros demasiado grandes, asi que vamos a implementarlo mediante un metodo
// derivado de Trial Division como el que se muestra aca:
// https://en.wikipedia.org/wiki/Primality_test
// Si bien esta no es la mejor implementacion existente, con que uds puedan 
// informarse sobre algoritmos, leerlos de un pseudocodigo e implemnterlos alcanzara

function primalityTest(num) {
    if (num <= 3) return num > 1;//returna 2 y 3 true;
    if ((num % 2 === 0) || (num % 3 === 0)) return false;//El numero primo solo es divisible por si mismo y 1 (Ya descartado 2 y 3);
    let numPrimo = true;//Seteamos en true;
    for( let i = 4; i < num/2; i++){ //Hasta num/2 para optimizar el tiempo.
        if(num % i === 0){
            numPrimo = false;
            break;//si es false, corta el for;
        }        
    }
    return numPrimo;
}



// EJERCICIO 10
// Implementa el algoritmo conocido como 'quickSort', que dado un arreglo de elemntos
// retorn el mismo ordenado de 'mayor a menor!'
// https://en.wikipedia.org/wiki/Quicksort

function quickSort(array) {
    
}




// ----- EXTRA CREDIT -----

// EJERCICIO 11
// Implementa la función 'reverse', que recibe un numero entero como parametro
// e invierte el mismo.
// Pero Debería hacer esto sin convertir el número introducido en una cadena, o un array
// Ejemplo:
// > reverse(123);
// < 321
// > reverse(95823);
// < 32859

function reverse(num){
   
}
// la grandiosa resolucion de Wilson!!!
// declaran una variable donde 
// almacenar el el numero invertido
// y van multiplicando por 10 la 
// porcion del numero que ya invirtieron
// deforma que esta se corra hacia la izq
// para agregar el ultimo numero de la 
// porcion no revertida
// y luego le quitan a la porcion 
// no revertida el ultimo numero

module.exports = {
    exponencial,
    direcciones,
    deepEqualArrays,
    OrderedLinkedList,
    multiCallbacks,
    primalityTest,
    quickSort,
    reverse,
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
}