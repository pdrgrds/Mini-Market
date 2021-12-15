package com.example.proyectomarket.model

import com.google.firebase.firestore.PropertyName

class Categoria (
        @get:PropertyName("Id") @set:PropertyName("Id") var Id:String,
        @get:PropertyName("descripcion") @set:PropertyName("descripcion") var descripcion:String,
        @get:PropertyName("uid") @set:PropertyName("uid")  var uid:String ) {
}