/**
 *  - `args`:
 *      - `affinities` : Up to 3 affinity IDs (e.g. `toxony:cold`, `toxony:soul`, `toxony:wind`, `toxony:heat`, `toxony:decay`, `toxony:moon`, `toxony:sun`, `toxony:forest`, `toxony:nether`, `toxony:ocean`).
 *      - `auxiliary` : Up to 2 ingredients: {item: "..."} or {tag: "..."}.
 *      - `main` : Single ingredient: {item: "..."} or {tag: "..."}.
 *      - `result` : Result item id.
 */
const customAlchemicalForgeCraft = (event, args) => {
    event.custom({
        "type": "toxony:alchemical_forge",
        "affinities": args.affinities,
        "auxiliary": args.auxiliary,
        "main": args.main,
        "result": {
            "id": args.result
        },
    });
};

ServerEvents.recipes(event => {
    

    

})