/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3065260126")

  // update collection data
  unmarshal({
    "name": "TeinteVerre"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3065260126")

  // update collection data
  unmarshal({
    "name": "TeinteVerres"
  }, collection)

  return app.save(collection)
})
