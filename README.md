# In3-Service


## Development server

Run `docker-compose up` for a dev server. Navigate to `http://localhost:5300/`. Navigate to api docs `http://localhost:5300/docs`  

```sh
$ docker-compose up
```
## Routes

call `http://localhost:5300/api/in3service/store/filters` to get all filter dynamic and fill all dropdowns

# Example 
```json
{
    "data": {
        "ramDropDown": [
            "8GB",
        ],
        "inchesDropDown": [
            "13.3",
        ],
        "opSysDropDown": [
            "macOS",
        ],
        "cpuDropDown": [
            "Intel Core i5",
        ]
    }
}
```


# Example 
call `http://localhost:5300/api/in3service/store/search?search=apple&cpu[]=Intel Core i5&cpu[]=intel cort i7`

```json
{
    "data": [
        {
            "_id": "5e414cee1ec98a001b5d3d92",
            "is_active": true,
            "company": "Apple",
            "product": "MacBook Air",
            "type": "Ultrabook",
            "inches": "11.6",
            "resolution": "1366x768",
            "cpu": "Intel Core i5 1.6GHz",
            "ram": "4GB",
            "memory": "256GB Flash Storage",
            "graphics": "Intel HD Graphics 6000",
            "opSys": "Mac OS X",
            "weight": "1.08kg",
            "price": "959",
            "__v": 0,
            "created_at": "2020-02-10T12:30:38.815Z",
            "updated_at": "2020-02-10T12:30:38.815Z",
            "toLower": "macbook air"
        },
    ],
    "count": 1
}
```

