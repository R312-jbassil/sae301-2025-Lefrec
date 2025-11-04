/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1593071543")

  // update collection data
  unmarshal({
    "name": "MatBranche"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1593071543")

  // update collection data
  unmarshal({
    "name": "MatBranches"
  }, collection)

  return app.save(collection)
})
