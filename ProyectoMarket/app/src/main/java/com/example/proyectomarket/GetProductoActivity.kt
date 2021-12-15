package com.example.proyectomarket

import android.app.ProgressDialog
import android.content.ContentValues
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Toast
import com.example.proyectomarket.model.Product
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_create_producto.*

import kotlinx.android.synthetic.main.activity_get_producto.*
import java.util.regex.Pattern

class GetProductoActivity : AppCompatActivity() {
    var patron_codigo= Pattern.compile("P[0-9]{4}")
    var patron_nombre= Pattern.compile("[0-9a-zA-Z ]{3,100}")
    var patron_descripcion= Pattern.compile("[0-9a-zA-Z ]{3,100}")
    var patron_estado= Pattern.compile("[A,I]{1}")
    var patron_precio= Pattern.compile("[0-9]{1,5}[.]{1}[0-9]{1,2}")
    var patron_stock= Pattern.compile("[0-9]{1,10}")
    var patron_categoria= Pattern.compile("CT[0-9]{3}")
    var patron_proveedor= Pattern.compile("PV[0-9]{3}")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_get_producto)
        title = "Consultar/Actualizar Producto"
    }

    var uid:String = ""

    fun buscarProducto(v:View) {
        val cod = EDTCODIGOPRODUCTO_B.text.toString()
        val db = FirebaseFirestore.getInstance()
        val productos = db.collection("Productos").whereEqualTo("Codigo", cod)
        //VALIDACION CODIGO
        if(patron_codigo.matcher(cod).matches()==false){
            EDTCODIGOPRODUCTO_E.setError("Formato Incorrecto Inicia con P y luego 4 números")
            return;
        }else
            EDTCODIGOPRODUCTO_E.setError(null);

        var progreso = ProgressDialog.show(this,
                "Buscando Datos","Espere un Momento ...", true)
        productos.get()
            .addOnSuccessListener { snapshot ->
                if (snapshot != null && snapshot.documents.size != 0) {
                    val data = snapshot.documents[0];
                    uid = snapshot.documents[0].id
                    escribirInputs(data)
                    progreso.dismiss()
                } else {
                    Toast.makeText(applicationContext, "No se encontró el Producto ${cod}", Toast.LENGTH_LONG).show()
                    LimpiarInputs()
                    progreso.dismiss()
                }
            }
            .addOnFailureListener { exception ->
                Log.d(ContentValues.TAG, "get failed with ", exception)
                progreso.dismiss()
            }
    }

    fun escribirInputs(data:DocumentSnapshot){
        EDTCODIGOPRODUCTO_E.setText(data.get("Codigo").toString())
        EDTNOMBREPRODUCTO_E.setText(data.get("Nombre").toString())
        EDTDESCRIPCIONPRODUCTO_E.setText(data.get("Descripcion").toString())
        EDTESTADOPRODUCTO_E.setText(data.get("Estado").toString())
        EDTPRECIOPRODUCTO_E.setText(data.get("Precio").toString())
        EDTSTOCKPRODUCTO_E.setText(data.get("Stock").toString())
        EDTCODIGOCATGPRODUCTO_E.setText(data.get("cod_catg").toString())
        EDTPROVEEPRODUCTO_E.setText(data.get("cod_prov").toString())
    }

    fun LimpiarInputs() {
        EDTCODIGOPRODUCTO_E.setText("")
        EDTNOMBREPRODUCTO_E.setText("")
        EDTDESCRIPCIONPRODUCTO_E.setText("")
        EDTESTADOPRODUCTO_E.setText("")
        EDTPRECIOPRODUCTO_E.setText("")
        EDTSTOCKPRODUCTO_E.setText("")
        EDTCODIGOCATGPRODUCTO_E.setText("")
        EDTPROVEEPRODUCTO_E.setText("")
    }


    fun ActualizarProducto(v:View){



        var codigo = EDTCODIGOPRODUCTO_E.text.toString()
        var nombre = EDTNOMBREPRODUCTO_E.text.toString()
        var descripcion = EDTDESCRIPCIONPRODUCTO_E.text.toString()
        var estado = EDTESTADOPRODUCTO_E.text.toString()
        var precio = EDTPRECIOPRODUCTO_E.text.toString()
        var stock = EDTSTOCKPRODUCTO_E.text.toString()
        var codcatg = EDTCODIGOCATGPRODUCTO_E.text.toString()
        var codprov = EDTPROVEEPRODUCTO_E.text.toString()

        //VALIDACION NOMBRES
        if(patron_nombre.matcher(nombre).matches()==false){
            EDTNOMBREPRODUCTO_E.setError("Ingrese un nombre, min 3 a max 100 caracteres")
            return;
        }else
            EDTNOMBREPRODUCTO_E.setError(null);
        //VALIDACION DESCRIPCION
        if(patron_descripcion.matcher(descripcion).matches()==false){
            EDTDESCRIPCIONPRODUCTO_E.setError("Ingrese una descripcion, min 3 a max 100 caracteres")
            return;
        }else
            EDTDESCRIPCIONPRODUCTO_E.setError(null);
        //VALIDACION ESTADO
        if(patron_estado.matcher(estado).matches()==false){
            EDTESTADOPRODUCTO_E.setError("Ingrese un estado, A o I")
            return;
        }else
            EDTESTADOPRODUCTO_E.setError(null);
        //VALIDACION PRECIO
        if(patron_precio.matcher(precio).matches()==false){
            EDTPRECIOPRODUCTO_E.setError("Formato Incorrecto Inicia con 00.00")
            return;
        }else
            EDTPRECIOPRODUCTO_E.setError(null);
        //VALIDACION STOCK
        if(patron_stock.matcher(stock).matches()==false){
            EDTSTOCKPRODUCTO_E.setError("Ingrese un stock, min 1 a max 10 números")
            return;
        }else
            EDTSTOCKPRODUCTO_E.setError(null);
        //VALIDACION CATEGORIA
        if(patron_categoria.matcher(codcatg).matches()==false){
            EDTCODIGOCATGPRODUCTO_E.setError("Ingrese una Cateogira Valida")
            return;
        }else
            EDTCODIGOCATGPRODUCTO_E.setError(null);
        //VALIDACION PROVEEDOR
        if(patron_proveedor.matcher(codprov).matches()==false){
            EDTPROVEEPRODUCTO_E.setError("Ingrese una Proveedor Valido")
            return;
        }else
            EDTPROVEEPRODUCTO_E.setError(null);


        var product = Product(codigo, descripcion, estado, nombre, precio, stock, codcatg, codprov, "")
        val db = FirebaseFirestore.getInstance()
        var progreso = ProgressDialog.show(this,
                "Listando Datos","Espere un Momento ...", true)

        db.collection("Productos").document(uid).set(product).addOnSuccessListener {
            Toast.makeText(applicationContext, "Producto Actualizado OK", Toast.LENGTH_LONG).show()
            progreso.dismiss()
        }.addOnFailureListener { exception ->
            Log.d(ContentValues.TAG, "Codigo Ya Existe", exception)
            progreso.dismiss()
        }

    }
}