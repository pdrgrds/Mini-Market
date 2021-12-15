package com.example.proyectomarket

import android.app.ProgressDialog
import android.content.ContentValues
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.ArrayAdapter
import com.example.proyectomarket.model.Categoria
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_list_categoria.*


class ListCategoriaActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_list_categoria)
        title = "Lista Categorias"
        listaCategoria();
    }

    fun listaCategoria() {
        val db = FirebaseFirestore.getInstance()
        val categoria = db.collection("CategoriaProductos")
        var lista = ArrayList<Categoria>();
        var progreso = ProgressDialog.show(this,
                "Listando Datos","Espere un Momento ...", true)
        categoria.get()
                .addOnSuccessListener { document ->
                    if (document != null) {

                        val list = document.documents;
                        for (i in list) run {
                            var cad: Categoria
                            cad = Categoria(i.get("Id").toString(), i.get("descripcion").toString(), i.get("uid").toString())
                            lista.add(cad);
                            progreso.dismiss()
                        }
                        mostrarCategoria(lista);
                        progreso.dismiss()
                    } else {
                        Log.d(ContentValues.TAG, "No such document")
                        progreso.dismiss()
                    }
                }
                .addOnFailureListener { exception ->
                    Log.d(ContentValues.TAG, "get failed with ", exception)
                    progreso.dismiss()
                }
    }

    fun mostrarCategoria(cadena:ArrayList<Categoria>)
    {
        try {
            var lista=ArrayList<String>()
            var cad="";
            var json = cadena;
            var Contador:Int = json.size - 1;

            for (i in 0..Contador )
            {
                cad = json[i].Id + "\n" +
                        json[i].descripcion + "\n"
                lista.add(cad);
            }

            var adaptador = ArrayAdapter<String>(
                    this,
                    android.R.layout.simple_list_item_1,
                    lista
            )

            lvCategoria.adapter = adaptador
        }catch (ex:Exception){
            Log.e("error", ex.message.toString())
        }

    }
}