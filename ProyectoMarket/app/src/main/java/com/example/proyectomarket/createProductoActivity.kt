package com.example.proyectomarket

import android.app.ProgressDialog
import android.content.ContentValues
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.ArrayAdapter
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.proyectomarket.model.Product
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.android.synthetic.main.activity_create_producto.*
import java.util.regex.Pattern


class createProductoActivity : AppCompatActivity() {
    var patron_codigo= Pattern.compile("P[0-9]{4}")
    var patron_nombre= Pattern.compile("[0-9a-zA-Z ]{3,100}")
    var patron_descripcion= Pattern.compile("[0-9a-zA-Z ]{3,100}")
    var patron_estado= Pattern.compile("[A,I]{1}")
    var patron_precio= Pattern.compile("[0-9]{1,5}[.]{1}[0-9]{1,2}")
    var patron_stock= Pattern.compile("[0-9]{1,10}")

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_create_producto)
        title = "Crear Producto"

        startUp()
    }

    private fun startUp(){
        val db = FirebaseFirestore.getInstance()
        ListarProveedor(db)
        ListarCategoria(db)
    }

    private fun ListarProveedor(db: FirebaseFirestore){
        val proveedor = db.collection("Proveedor")
        var lista = ArrayList<String>();

        proveedor.get()
            .addOnSuccessListener { document ->
                if (document != null) {

                    val list = document.documents;
                    for (i in list) run {
                        var cad:String = i.get("codigo").toString()
                        lista.add(cad);
                    }

                    val arrayAdapter: ArrayAdapter<String> = ArrayAdapter<String>(
                        this,
                        android.R.layout.simple_spinner_item,
                        lista
                    )
                    arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                    SPPROVEEDOR_PRODUCTO.setAdapter(arrayAdapter)
                }
            }
            .addOnFailureListener { exception ->
                Log.d(ContentValues.TAG, "get failed with ", exception)
            }
    }

    private fun ListarCategoria(db: FirebaseFirestore){
        val categoria = db.collection("CategoriaProductos")
        var lista = ArrayList<String>();

        categoria.get()
            .addOnSuccessListener { document ->
                if (document != null) {

                    val list = document.documents;
                    for (i in list) run {
                        var cad:String = i.get("Id").toString()
                        lista.add(cad);
                    }

                    val arrayAdapter: ArrayAdapter<String> = ArrayAdapter<String>(
                        this,
                        android.R.layout.simple_spinner_item,
                        lista
                    )
                    arrayAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item)
                    SPCATEGORIA_PRODUCTO.setAdapter(arrayAdapter)
                }
            }
            .addOnFailureListener { exception ->
                Log.d(ContentValues.TAG, "get failed with ", exception)
            }
    }


    fun CrearProducto(v: View){
        var codigo = EDTCODIGOPRODUCTO_C.text.toString()
        var nombre = EDTNOMBREPRODUCTO_C.text.toString()
        var descripcion = EDTDESCRIPCIONPRODUCTO_C.text.toString()
        var estado = EDTESTADOPRODUCTO_C.text.toString()
        var precio = EDTPRECIOPRODUCTO_C.text.toString()
        var stock = EDTSTOCKPRODUCTO_C.text.toString()
        var codcatg = SPCATEGORIA_PRODUCTO.getSelectedItem().toString();
        var codprov = SPPROVEEDOR_PRODUCTO.getSelectedItem().toString()

        //VALIDACION CODIGO
        if(patron_codigo.matcher(codigo).matches()==false){
            EDTCODIGOPRODUCTO_C.setError("Formato Incorrecto Inicia con P y luego 4 números")
            return;
        }else
            EDTCODIGOPRODUCTO_C.setError(null);

        //VALIDACION NOMBRE
        if(patron_nombre.matcher(nombre).matches()==false){
            EDTNOMBREPRODUCTO_C.setError("Ingrese un nombre, min 3 a max 100 caracteres")
            return;
        }else
            EDTNOMBREPRODUCTO_C.setError(null);

        //VALIDACION DESCRIPCION
        if(patron_descripcion.matcher(descripcion).matches()==false){
            EDTDESCRIPCIONPRODUCTO_C.setError("Ingrese una descripcion, min 3 a max 100 caracteres")
            return;
        }else
            EDTDESCRIPCIONPRODUCTO_C.setError(null);

        //VALIDACION ESTADO
        if(patron_estado.matcher(estado).matches()==false){
            EDTESTADOPRODUCTO_C.setError("Ingrese un estado, A o I")
            return;
        }else
            EDTESTADOPRODUCTO_C.setError(null);

        //VALIDACION PRECIO
        if(patron_precio.matcher(precio).matches()==false){
            EDTPRECIOPRODUCTO_C.setError("Formato Incorrecto Inicia con 00.00")
            return;
        }else
            EDTPRECIOPRODUCTO_C.setError(null);

        //VALIDACION STOCK
        if(patron_stock.matcher(stock).matches()==false){
            EDTSTOCKPRODUCTO_C.setError("Ingrese un stock, min 1 a max 10 números")
            return;
        }else
            EDTSTOCKPRODUCTO_C.setError(null);

        //VALIDACION CATEGORIA
        if(codcatg == ""){
            (SPCATEGORIA_PRODUCTO.getSelectedView() as TextView).error = "Ingrese una Categoria"
            return;
        }else
            (SPCATEGORIA_PRODUCTO.getSelectedView() as TextView).error = null

        //VALIDACION PROVEEDOR
        if(codprov == ""){
            (SPPROVEEDOR_PRODUCTO.getSelectedView() as TextView).error = "Ingrese una Proveedor"
            return;
        }else
            (SPPROVEEDOR_PRODUCTO.getSelectedView() as TextView).error = null

        var producto = Product(
            codigo,
            descripcion,
            estado,
            nombre,
            precio,
            stock,
            codcatg,
            codprov,
            ""
        )

        val db = FirebaseFirestore.getInstance()
        var progreso = ProgressDialog.show(
            this,
            "Grabando Datos", "Espere un Momento ...", true
        )
        db.collection("Productos").add(producto).addOnSuccessListener {
            Log.e("Success", "Usuario Creado");
            Toast.makeText(applicationContext, "Producto grabado OK", Toast.LENGTH_LONG).show()

            progreso.dismiss()
        }.addOnFailureListener { exception ->
            Log.d(ContentValues.TAG, "Codigo Ya Existe", exception)
            progreso.dismiss()

        }

    }

    fun listarProducto(v: View){
        var intent:Intent = Intent(this, ListProductosActivity::class.java)
        startActivity(intent)
    }

    fun nuevoProduccto(v: View){
        EDTCODIGOPRODUCTO_C.setText("");
        EDTNOMBREPRODUCTO_C.setText("");
        EDTDESCRIPCIONPRODUCTO_C.setText("");
        EDTESTADOPRODUCTO_C.setText("");
        EDTPRECIOPRODUCTO_C.setText("");
        EDTSTOCKPRODUCTO_C.setText("");
        Toast.makeText(applicationContext, "Nuevo", Toast.LENGTH_SHORT).show();

    }

    fun cerrarProducto(v: View){
        finish();
    }

    fun BuscarProducto(v: View){
        var intent:Intent = Intent(this, GetProductoActivity::class.java)
        startActivity(intent)
    }
}