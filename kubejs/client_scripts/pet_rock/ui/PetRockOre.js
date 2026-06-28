function PetRockOre(id) {
    const self = this
    this.pos = { 
        x: 0, y: 0,
        set(x, y){
            this.x = x
            this.y = y
            self.prevPos = { x: x, y: y }
            self.targetPos = { x: x, y: y }
        },
        increase(xDelta, yDelta){
            this.x += xDelta
            this.y += yDelta
        },
        copy(){
            return {x:this.x, y:this.y}
        }
     }
    this.prevPos = { 
        x: 0, y: 0 
    }
    this.targetPos = { 
        x: 0, y: 0 
    }
    this.vialCenterPos = {
        x: 0, y: 0,
        set(x, y) {
            this.x = x - 8
            this.y = y - 8
        },
    }
    this.rotationRadius = 25

    this.id = id
    this.isDragged = false
    this.isHovered = false

    this.moveTicks = 20
    this.retTicks = 20
    this.ticks = this.moveTicks
    this.size = 16
    this.hoverAnimationAngle = 0
    this.isReturning = false
    this.isSelected = false

    this.index = 0
    this.vialMaxIndex = 0

    this.vial = null

    this.setVial = function(vial){
        this.vial = vial
    }

    this.setIndex = function (index) {
        this.index = index
    }

    this.setVialMaxIndex = function (index) {
        this.vialMaxIndex = index
    }

    this.setSelected = function(bool){
        this.isSelected = bool
        
    }

    this.getOrbitalPosition = function () {
        let step = TWO_PI / (this.vialMaxIndex + 1)
        let oreAngle = this.vial.oresRotationAngle + this.index * step
        let centerX = this.vialCenterPos.x
        let centerY = this.vialCenterPos.y
        return {
            x: centerX + this.rotationRadius * Math.cos(oreAngle),
            y: centerY + this.rotationRadius * Math.sin(oreAngle)
        }
    }

    this.render = function (guiGraphics, pose, mouseX, mouseY) {

        pose.pushPose()

        let x = lerp(this.prevPos.x, this.pos.x)
        let y = lerp(this.prevPos.y , this.pos.y)

        //console.log(this.vial.isDragging)

        if (this.isMouseOver(mouseX, mouseY) && !this.vial.isDragging) {
            if (!this.isHovered) this.onHover(mouseX, mouseY)
            if(!this.isReturning){
                x = this.pos.x
                y = this.pos.y
                this.hoverAnimationAngle += Math.PI / 250
            }
            
        } else {
            if(this.isHovered) this.onUnhover()
        }
        

        pose.translate(x, y, 0)
        pose.translate(8, 8, 150)
        pose.mulPose($Axis.YP.rotation(Math.sin(this.hoverAnimationAngle) / 1.5))
        pose.mulPose($Axis.XP.rotation(Math.sin(this.hoverAnimationAngle / 3) / 2))
        pose.translate(-8, -8, -150)

        let item = Item.of(this.id)

        guiGraphics.renderFakeItem(item, 0, 0)


        pose.popPose()

    }

    this.onHover = function (mouseX, mouseY){
        this.isHovered = true
        this.hoverAnimationAngle = 0
        if (this.vial.isMouseOver(mouseX, mouseY)) this.vial.setOreHovered(true)
        
    }

    this.onUnhover = function(){
        this.isHovered = false
        this.hoverAnimationAngle = 0
        this.vial.setOreHovered(false)
    }

    this.isMouseOver = function(mouseX, mouseY){
        let {x, y} = this.pos
        return mouseX >= x && mouseX <= x + this.size && mouseY >= y && mouseY <= y + this.size
    }

    this.onDragging = function (mouseX, mouseY, deltaX, deltaY) {

        this.pos.set(mouseX-8, mouseY-8)

    }

    this.onDragStop = function(){
        this.isDragged = false
        this.ticks = this.moveTicks
    }

    this.returnTo =function(x, y){
        this.isReturning = true
        this.targetPos = {x:x, y:y}
    }

    this.tick = function () {

        if(this.isDragged) return
        if(this.isSelected) return
        this.prevPos = this.pos.copy()

        if(this.isReturning){
            let retXDelta = (this.targetPos.x - this.pos.x) * (1 / this.retTicks)
            let retYDelta = (this.targetPos.y - this.pos.y) * (1 / this.retTicks)
            this.pos.increase(retXDelta, retYDelta)
            this.targetPos = this.getOrbitalPosition()
            if (Math.abs(retXDelta) < 1 && Math.abs(retYDelta) < 1) this.isReturning = false
            return
        }

        if (this.isHovered) return

        //let shouldTick = Math.random() > 0.65 ? true : false
        //if(!shouldTick) return

        this.ticks++
        
        let posXDelta = (this.targetPos.x - this.pos.x) * (1 / this.moveTicks)
        let posYDelta = (this.targetPos.y - this.pos.y) * (1 / this.moveTicks)
        //console.log(posYDelta);
        
        this.pos.increase(posXDelta, posYDelta)
        
        // if (this.ticks <= this.moveTicks) return

        // this.ticks = 0
        this.targetPos = this.getOrbitalPosition()

    }


}
