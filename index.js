const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(elements, callback) {
      // determine if elements is an array or object
      if (Array.isArray(elements)){
        for (let i = 0; i < elements.length; i++){
          callback(elements[i], i, elements)
        }
      } else {
        for (const key in elements){
          callback(elements[key], key, elements)
        }
      }

      
      return elements

      // checking if instance of array
      // if it is, slice the array which just creates copy
      // otherwise, they're calling object.values which returns array of values
      // const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection)

      //looping through new collection
      // for (let idx = 0; idx < newCollection.length; idx++)
      //   iteratee(newCollection[idx])

      // return collection
    },

    map: function(collection, callback) {
      if (!Array.isArray(collection)){ //if collection isn't an array
        collection = Object.values(collection) //makes it an array
        
        }

      const newCollection = []

      for (let i = 0; i < collection.length; i++){
        newCollection.push(callback(collection[i]))
      }

      return newCollection
    },

    reduce: function(collection, callback, acc) {

      let newCollection = collection.slice() 
      //so dont mutate original collection, same as .slice(0)

      if (!acc){
        acc = newCollection[0]
        newCollection = newCollection.slice(1) //so now will skip first element
      }

      for (let i = 0; i < newCollection.length; i++){
        acc = callback(acc, newCollection[i], newCollection)
      }

      return acc

    },

    find: function(collection, predicate){ 
      for (let i = 0; i < collection.length; i++){
        if (predicate(collection[i])){
          return collection[i]
        }
      }
    },

    filter: function(collection, predicate){
      const newCollection = []

      for (let i = 0; i < collection.length; i++){
        if (predicate(collection[i])){
          newCollection.push(collection[i])
        }
      }
      return newCollection
    },

    size: function(collection){
      if (Array.isArray(collection)){ 
        return collection.length
      } else {
        collection = Object.values(collection) //makes it an array
        return collection.length
      }
    },

    first: function(array, number=false){
      if (number){
        return array.slice(0, number)
      } else {
        return array[0]
      }
    },

    last: function(array, number=false){
      if (number){
        return array.slice(array.length - number, array.length)
      } else {
        return array[array.length - 1]
      }
    },

    compact: function(collection){
      const newCollection = []

      for (let i = 0; i < collection.length; i++){
        if (collection[i]){
          newCollection.push(collection[i])
        }
      }
      return newCollection
    },

    sortBy: function(array, callback){
      const newCollection = [...array]
      return newCollection.sort(function(a, b){
        return callback(a) - callback(b)
      })

    },
    //define below to use for flatten
    unpack: function(receiver, arr) { //receiver is new array, array is what you're unpacking
      for (let val of arr)
        receiver.push(val) 
        //for each item in old array, will push into new one
    },

    flatten: function(collection, shallow, newArr=[]) {//defaults new Array to empty
      //if the collection isnt an array, then push the value into a new array and return the result
      if (!Array.isArray(collection)) return newArr.push(collection)
      // base case for the recursion
      // for recursive functions to work, need to have base case to exit the recursion
      //this is how we tell we're done with the recursion
      // since could be dealing with deeply nested, 
      // this is saying keep going recursively unless element is an array
      // then can break out and move onto next element or exit

      //shallow is true if you just want to unpack it one level
      if (shallow) {
        for (let val of collection)
        //for each value in collection, if its another array, unpack it
        //otherwise just push the value into the new array
          Array.isArray(val) ? this.unpack(newArr, val) : newArr.push(val)
      } else {
        for (let val of collection) {
          //if its not shallow, go through and recursively call flatten
          // pass in element of array, false to deeply flatten, and newArray we're storing values into
          //will recursively flatten each element 
          this.flatten(val, false, newArr)
        }
      }
      return newArr
    },

    uniqSorted: function(collection, iteratee) { //to be used in below function
      const sorted = [collection[0]] //first item in array
      //loop through every item in the array, not including the first item
      // set idx to 1 below to skip first item
      for (let idx = 1; idx < collection.length; idx++) { 
        // if the previous item in sorted array is not the same as the item
        // then push this item into the array
        // b/c we know it's sorted, just need to compare to previous element
        if (sorted[idx-1] !== collection[idx])
          sorted.push(collection[idx])
      }
      return sorted
    },

    uniq: function(collection, sorted=false, iteratee=false) {
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
        //fi is variable we stored our object to
      } else if (!iteratee) {
        // a Set is a collection type that requires for there to be unique values
        // gets rid of all duplicate values
        return Array.from(new Set(collection))
      } else {
        //Set is basically an array that can only have unique values in it
        const modifiedVals = new Set() 
        const uniqVals = new Set()
        for (let val of collection) {
          const moddedVal = iteratee(val) //invoking iteratee function w/ value
          if (!modifiedVals.has(moddedVal)) { //if new value hasn't been added yet
            modifiedVals.add(moddedVal)
            uniqVals.add(val)
          }
        }
        return Array.from(uniqVals)
      }
    },

    keys: function(obj) {
      // Using for loop
      const keys = []
      for (let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj) {
      // Using for loop
      const values = []
      for (let key in obj){
        values.push(obj[key])
      }
      return values

      // Using the custom 'map' method from above
      // return this.map(obj, (value) => value)

    },



   functions: function(obj) {
      const functionNames = []

      for (let key in obj) {
        if (typeof obj[key] === "function"){
          functionNames.push(key)
        }
      }

      return functionNames.sort()
    },



  }
})()

fi.libraryMethod()
