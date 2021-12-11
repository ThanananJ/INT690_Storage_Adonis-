import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {  
    
    Route.get("/store/:storeID/addproduct", "ProductsController.create").as("product.add")
    Route.post("/store/:storeID/addproduct", "ProductsController.store").as("product.store")
    Route.get("/store/:storeID/deleteproduct/:productID", "ProductsController.destroy").as("product.delete")
    Route.get("/store/:storeID/product/:productID", "ProductsController.show").as("product.show")
    Route.post("/store/:storeID/product/:productID", "ProductsController.edit").as("product.edit")
  
  }).middleware("auth");