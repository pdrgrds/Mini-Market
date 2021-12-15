package com.example.proyectomarket.model

import com.google.firebase.firestore.PropertyName

class Proveedor (
    @get:PropertyName("codigo") @set:PropertyName("codigo") var codigo:String,
    @get:PropertyName("descripcion") @set:PropertyName("descripcion") var descripcion:String,
    @get:PropertyName("nombre") @set:PropertyName("nombre") var nombre:String,
    @get:PropertyName("uid") @set:PropertyName("uid")  var uid:String ) {

}