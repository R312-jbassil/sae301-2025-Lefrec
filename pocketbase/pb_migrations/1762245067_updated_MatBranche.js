/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1593071543")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "file83635035",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "Image",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1593071543")

  // remove field
  collection.fields.removeById("file83635035")

  return app.save(collection)
})
