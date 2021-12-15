package com.example.proyectomarket.model

import com.google.firebase.firestore.PropertyName

class Product (@get:PropertyName("Codigo") @set:PropertyName("Codigo") var Codigo:String,
               @get:PropertyName("Descripcion") @set:PropertyName("Descripcion") var Descripcion:String,
               @get:PropertyName("Estado") @set:PropertyName("Estado") var Estado:String,
               @get:PropertyName("Nombre") @set:PropertyName("Nombre") var Nombre:String,
               @get:PropertyName("Precio") @set:PropertyName("Precio") var Precio:String,
               @get:PropertyName("Stock") @set:PropertyName("Stock") var Stock:String,
               @get:PropertyName("cod_catg") @set:PropertyName("cod_catg") var cod_catg:String,
               @get:PropertyName("cod_prov") @set:PropertyName("cod_prov") var cod_prov:String,
               @get:PropertyName("uid") @set:PropertyName("uid")  var uid:String ) {
}