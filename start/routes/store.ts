import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
    Route.get("/", async ({ view }) => {
      return view.render("index");
    });
  
    Route.get("/index", "StoresController.index").as("index");
    
    Route.get("/store/add", "StoresController.create").as("store.add")
    Route.post("/store/add", "StoresController.store").as("store.store")
    Route.get("/store/:storeID/delete", "StoresController.destroy").as("store.delete")
    Route.get("/store/:storeID", "StoresController.show").as("store.show")
    Route.post("/store/:storeID/edit", "StoresController.edit").as("store.edit")
  
  }).middleware("auth");