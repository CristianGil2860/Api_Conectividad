<div class="row">
    <!-- este se uso para mover el card al medio -->
    <div class="col-md-4">

    </div>
    <div class="col-md-4">
        <br> <br>
        <div class="card">
            <div class="card-header">
                <h2>Acceder</h2>
            </div>
            <div class="card-body">

                <div class="alert alert-danger" role="alert">

                </div>

                <form id="formlogin" method="POST" action="./controller/validationlogin.php">

                    <div class="form-group">
                        <span class="input-group-text"><i class="fa-solid fa-user fa-lg"></i></span>
                        <input type="text" class="form-control" name="nombre_usuario" id="nombre_usuario" required="" placeholder="Nombre Usuario">
                    </div>
                   


                    <div class="form-group">
                        <span class="input-group-text"><i class="fa-solid fa-key"></i></span>
                        <input type="password" class="form-control" name="contrasena" id="contrasena" required="" placeholder="Password">
                    </div>    
                       

                    
                    <div class="form-check">
                        <input type="checkbox" class="form-check-input">
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary btn-lg">Sign In</button>
                </form>
            </div>
        </div>
    </div>
</div>
</div>

