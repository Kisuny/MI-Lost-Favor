let devPenState = 0
let devPenAABB = AABB.CUBE

let $BlockState = Java.loadClass("net.minecraft.world.level.block.state.BlockState")
let $TagParser = Java.loadClass("net.minecraft.nbt.TagParser")

ItemEvents.firstRightClicked("milf:dev_pen", event => {
    if(!event.getTarget()?.block.getPos()) return
    let blockpos = event.getTarget().block.getPos()

    let controllerPlaceholderId = "modern_industrialization:creative_storage_unit"

    switch (devPenState) {
        case 0:
            devPenAABB = AABB.ofBlock(blockpos.offset(0,1,0))
            break;
        case 1:
            devPenAABB = devPenAABB.minmax(AABB.ofBlock(blockpos.offset(0,-1,0)))
            break;
        case 2:
            let {player} = event
            let statesSet = new Set()
            BlockPos.betweenClosedStream(devPenAABB.contract(0.01, 0.01, 0.01))
            .forEach((blockPos) => {
                let block = event.getLevel().getBlock(blockPos)
                let blockState = block.getBlockState()

                let blockStateString = getStateString(blockState)
                
                statesSet.add(blockStateString)
            })

            let stateKeyMap = { }

            stateKeyMap[getStateStringFromId("minecraft:air")] = " "

            let symbols = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"

            for(const stateEntry of statesSet){
                if (stateKeyMap.hasOwnProperty(stateEntry)) continue
                if (stateEntry == getStateStringFromId(controllerPlaceholderId)) {
                    stateKeyMap[stateEntry] = "#"
                    continue
                }
                stateKeyMap[stateEntry] = symbols.charAt(0)
                symbols = symbols.slice(1)
            }
            let cube = []
            for (let z = devPenAABB.getMinPosition().z(); z < devPenAABB.getMaxPosition().z(); z++) {
                let plane = []
                for (let y = devPenAABB.getMinPosition().y(); y < devPenAABB.getMaxPosition().y(); y++) {
                    let row = ""
                    for (let x = devPenAABB.getMinPosition().x(); x < devPenAABB.getMaxPosition().x(); x++) {
                        row = row + stateKeyMap[
                            getStateString(event.getLevel().getBlock(x, y, z).getBlockState())
                        ]
                    }
                    plane.push(row)
                }
                cube.push(plane)
            }
            let keyStateMap = {}
            for (const [stateString, stateKey] of Object.entries(stateKeyMap)) {
                if (stateString == getStateStringFromId("minecraft:air") || 
                    stateString == getStateStringFromId(controllerPlaceholderId)
                ) continue

                //console.log(stateString);
                

                let stateTag = $TagParser.parseTag(stateString)

               // console.log(stateTag);

                let blockEntry = {
                    id: stateTag.getString("Name"), 
                    hatches: null
                }

                if (stateTag.contains("Properties")) {
                    blockEntry.stateProperties = stateTag.getCompound("Properties").getAsString()
                }
                

                keyStateMap[stateKey] = blockEntry
            }

            switch (player.getHorizontalFacing()) {
                case Direction.NORTH:
                    break;

                case Direction.SOUTH:
                    cube = rotateCube180(cube)
                    break;

                case Direction.EAST:
                    cube = rotateCube90(cube, false)
                    break;

                case Direction.WEST:
                    cube = rotateCube90(cube, true)
                    break;
            
                default:
                    console.log("WHAT");
                    break;
            }
            
            console.log(cube);
            
            console.log(JSON.stringify(keyStateMap, null, 1))
            event.player.tell(Text.info("Shape arrays").clickCopy(cube.join(',\n')).hover('Click to copy shape arrays'))
            event.player.tell(Text.info("Shape keys").clickCopy(JSON.stringify(keyStateMap, null, 1)).hover('Click to copy key:id map'))
            break;
    }
    devPenState++
    devPenState %= 3

    function getStateStringFromId(id){
        return `{Name:\"${id}\"}`
    }

    function rotateCube180(cube) {

        let zSize = cube.length
        let ySize = cube[0].length

        let reverseString = (string) => string.split("").reverse().join("")

        let newCube = []
        for (let z = 0; z < zSize; z++) {
            newCube[z] = []
        }

        for (let z = 0; z < zSize; z++) {
            for (let y = 0; y < ySize; y++) {
                let targetZ = zSize - 1 - z
                let targetY = y

                newCube[targetZ][targetY] = reverseString(cube[z][y])
            }
        }

        return newCube

    }

    function rotateCube90(cube, isClockwise) {
        let zSize = cube.length
        let ySize = cube[0].length
        let xSize = cube[0][0].length
        
        let newCube = [];
        for (let nz = 0; nz < xSize; nz++) {
            newCube[nz] = []
            for (let ny = 0; ny < ySize; ny++) {
                newCube[nz][ny] = ""
            }
        }

        for (let nz = 0; nz < xSize; nz++) {
            for (let ny = 0; ny < ySize; ny++) {
                let newRowString = ""

                for (let nx = 0; nx < zSize; nx++) {
                    if (isClockwise) {
                        let oldZ = zSize - 1 - nx
                        let oldX = nz
                        newRowString += cube[oldZ][ny][oldX]
                    } else {
                        let oldZ = nx
                        let oldX = xSize - 1 - nz
                        newRowString += cube[oldZ][ny][oldX]
                    }
                }

                newCube[nz][ny] = newRowString
            }
        }

        return newCube
    }

    function getStateString(blockState){
        let stateTag = $NbtUtils.writeBlockState(blockState)

        if (stateTag.contains("Properties", 10)) {
            let propertiesTag = stateTag.getCompound("Properties")

            let excludedProperties = [

                BlockProperties.FACING,
                BlockProperties.NORTH,
                BlockProperties.WEST,
                BlockProperties.SOUTH,
                BlockProperties.EAST,

            ].map(property => property.getName())


            excludedProperties.forEach(propertyName => {
                propertiesTag.remove(propertyName)
            })

            if (propertiesTag.isEmpty()) {
                stateTag.remove("Properties")
            }
        }

        let blockStateString = stateTag.toString()

        return blockStateString
    }
})