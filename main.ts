enum ActionKind {
    Walking,
    Idle,
    Jumping,
    drowning
}
namespace SpriteKind {
    export const follower = SpriteKind.create()
    export const enviroment_1 = SpriteKind.create()
    export const text_block = SpriteKind.create()
    export const atteck_magic1 = SpriteKind.create()
    export const river = SpriteKind.create()
    export const chest = SpriteKind.create()
    export const dungeonentrance1 = SpriteKind.create()
}
sprites.onCreated(SpriteKind.Enemy, function (sprite) {
    enemy_HP = statusbars.create(25, 4, StatusBarKind.EnemyHealth)
    enemy_HP.value = 100
    enemy_HP.setColor(2, 4, 3)
    enemy_HP.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    enemy_HP.setBarBorder(1, 12)
})
function weapon_menu_tielmap () {
    tiles.loadMap(tiles.createMap(tilemap`weapon menu`))
    scene.centerCameraAt(80, 80)
}
function common_weapon_generation () {
    if (common_item_generation == 1) {
        weapon_menu = 1
        game.setDialogFrame(assets.image`Igen c 1`)
    } else if (common_item_generation == 2) {
        weapon_menu = 2
        game.setDialogFrame(assets.image`Igen c 2`)
    } else if (common_item_generation == 3) {
        weapon_menu = 3
        game.setDialogFrame(assets.image`Igen c 3`)
    } else if (common_item_generation == 4) {
        weapon_menu = 4
        game.setDialogFrame(assets.image`Igen c 4`)
    } else if (common_item_generation == 5) {
        weapon_menu = 5
        game.setDialogFrame(assets.image`Igen c 5`)
    } else if (common_item_generation == 6) {
        weapon_menu = 6
        game.setDialogFrame(assets.image`Igen c 6`)
    } else if (common_item_generation == 7) {
        weapon_menu = 7
        game.setDialogFrame(assets.image`Igen c 7`)
    } else if (common_item_generation == 8) {
        weapon_menu = 8
        game.setDialogFrame(assets.image`Igen c 8`)
    } else if (common_item_generation == 9) {
        weapon_menu = 9
        game.setDialogFrame(assets.image`Igen c 9`)
    } else if (common_item_generation == 10) {
        weapon_menu = 10
        game.setDialogFrame(assets.image`Igen c 10`)
    }
    common_item_generation = 0
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    MIGAMII,
    assets.animation`walking up`,
    200,
    true
    )
    animation.runImageAnimation(
    darkness,
    assets.animation`darkness walking up`,
    200,
    true
    )
    animation.runImageAnimation(
    aqua,
    assets.animation`aqua walking up`,
    200,
    true
    )
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.dungeonentrance1, function (sprite, otherSprite) {
	
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`sigh down`, function (sprite, location) {
    tiles.createSpritesOnTiles(assets.tile`sigh down`, SpriteKind.text_block)
    game.splash("to the evil castle ")
    pause(100)
    story.clearAllText()
    tiles.placeOnTile(darkness, tiles.getTileLocation(132, 13))
})
function migamii_attack1 () {
    if ((enemy_1.x == MIGAMII.x || enemy_1.y == MIGAMII.y) && (controller.A.isPressed() && CodeSequence == 2)) {
        MIGAMII.sayText("expulsion ", 2000, true)
        animation.runImageAnimation(
        MIGAMII,
        assets.animation`explotion`,
        500,
        false
        )
        exploshion_1 = sprites.createProjectileFromSprite(assets.image`explshon`, enemy_1, 0, 0)
        animation.runImageAnimation(
        exploshion_1,
        assets.animation`boom`,
        500,
        false
        )
        music.bigCrash.play()
        if (exploshion_1.overlapsWith(enemy_1)) {
            enemy_HP.value += -100
        }
    }
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    swiching_charicters()
})
statusbars.onZero(StatusBarKind.Health, function (status2) {
    game.setDialogTextColor(15)
    statusbar.attachToSprite(enemy_1)
    game.setDialogFrame(assets.image`eris`)
    game.showLongText("whelp you managed to die again, I'm sorry you have to deal with aqua", DialogLayout.Full)
    game.over(false, effects.clouds)
})
function aqua_attack2 () {
    if (attack_weapon_aqua == 1) {
        if ((enemy_1.x == aqua.x || enemy_1.y == aqua.y) && (controller.A.isPressed() && CodeSequence == 3)) {
            animation.runImageAnimation(
            aqua,
            assets.animation`aqua staff use right`,
            200,
            false
            )
            wave_attack = sprites.createProjectileFromSprite(assets.image`wave right`, aqua, 0, 0)
            wave_attack.follow(enemy_1)
            if (wave_attack.overlapsWith(enemy_1)) {
                enemy_HP.value += -30
                wave_attack.destroy(effects.bubbles, 500)
            }
        }
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (CodeSequence == 2 && controller.A.isPressed()) {
        migamii_attack1()
    }
    if (CodeSequence == 3 && controller.A.isPressed()) {
        aqua_attack2()
    }
    if (tiles.tileIs(tiles.getTileLocation(55, 14), sprites.dungeon.chestClosed) && darkness.overlapsWith(chest_opening)) {
        story.showPlayerChoices("take all items", "leave")
        if (controller.A.isPressed()) {
            story.spriteSayText(darkness, "take all items")
            game.setDialogFrame(assets.image`chest frame 1`)
            pause(100)
            game.showLongText("you took all items", DialogLayout.Bottom)
        } else if (controller.B.isPressed()) {
            story.spriteSayText(darkness, "leave")
        }
        if (story.checkLastAnswer("take all items")) {
            pause(2000)
            common_item_generation += randint(1, 10)
            common_weapon_generation()
            tiles.setTileAt(tiles.getTileLocation(55, 14), sprites.dungeon.chestOpen)
            tiles.placeOnTile(darkness, tiles.getTileLocation(55, 13))
            tiles.placeOnTile(aqua, tiles.getTileLocation(55, 13))
            tiles.placeOnTile(MIGAMII, tiles.getTileLocation(55, 13))
            tiles.setWallAt(tiles.getTileLocation(55, 14), true)
        } else if (story.checkLastAnswer("leave")) {
            tiles.placeOnTile(darkness, tiles.getTileLocation(55, 13))
            tiles.placeOnTile(aqua, tiles.getTileLocation(55, 13))
            tiles.placeOnTile(MIGAMII, tiles.getTileLocation(55, 13))
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`sigh left1`, function (sprite, location) {
    tiles.createSpritesOnTiles(assets.tile`sigh left1`, SpriteKind.text_block)
    game.splash("black forest")
    pause(100)
    story.clearAllText()
    tiles.placeOnTile(darkness, tiles.getTileLocation(135, 9))
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    MIGAMII,
    assets.animation`walking west`,
    200,
    true
    )
    animation.runImageAnimation(
    darkness,
    assets.animation`waking left`,
    200,
    true
    )
    animation.runImageAnimation(
    aqua,
    assets.animation`aqua walking left`,
    200,
    true
    )
})
statusbars.onStatusReached(StatusBarKind.Health, statusbars.StatusComparison.GT, statusbars.ComparisonType.Percentage, 50, function (status) {
    music.siren.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite2, otherSprite2) {
    enemy_1.follow(darkness, 40)
    animation.runImageAnimation(
    enemy_1,
    [img`
        ........................
        ....ffffff..............
        ..ffeeeef2f.............
        .ffeeeef222f............
        .feeeffeeeef...cc.......
        .ffffee2222ef.cdc.......
        .fe222ffffe2fcddc.......
        fffffffeeeffcddc........
        ffe44ebf44ecddc.........
        fee4d41fddecdc..........
        .feee4dddedccc..........
        ..ffee44e4dde...........
        ...f222244ee............
        ...f2222e2f.............
        ...f444455f.............
        ....ffffff..............
        .....fff................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ........................
        .......fff..............
        ....fffff2f.............
        ..ffeeeee22ff...........
        .ffeeeeee222ff..........
        .feeeefffeeeef..........
        .fffffeee2222ef.........
        fffe222fffffe2f.........
        fffffffffeeefff.....cc..
        fefe44ebbf44eef...ccdc..
        .fee4d4bbfddef..ccddcc..
        ..feee4dddddfeecdddc....
        ...f2222222eeddcdcc.....
        ...f444445e44ddccc......
        ...ffffffffeeee.........
        ...fff...ff.............
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        .......ff...............
        ....ffff2ff.............
        ..ffeeeef2ff............
        .ffeeeeef22ff...........
        .feeeeffeeeef...........
        .fffffee2222ef..........
        fffe222ffffe2f..........
        ffffffffeeefff..........
        fefe44ebf44eef..........
        .fee4d4bfddef...........
        ..feee4dddee.c..........
        ...f2222eeddeccccccc....
        ...f444e44ddecddddd.....
        ...fffffeeee.ccccc......
        ..ffffffff...c..........
        ..fff..ff...............
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `,img`
        ....ffffff..............
        ..ffeeeef2f.............
        .ffeeeef222f............
        .feeeffeeeef............
        .ffffee2222ef...........
        .fe222ffffe2f...........
        fffffffeeefff...........
        ffe44ebf44eef...........
        fee4d41fddef............
        .feee4ddddf.............
        ..fdde444ef.............
        ..fdde22ccc.............
        ...eef22cdc.............
        ...f4444cddc............
        ....fffffcddc...........
        .....fff..cddc..........
        ...........cdc..........
        ............cc..........
        ........................
        ........................
        ........................
        ........................
        ........................
        ........................
        `],
    200,
    false
    )
    statusbar.value += -7
    music.smallCrash.play()
    pause(1000)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    enemy_1.destroy()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`sigh right`, function (sprite, location) {
    tiles.createSpritesOnTiles(assets.tile`sigh right`, SpriteKind.text_block)
    game.splash("placeholder")
    pause(100)
    story.clearAllText()
    tiles.placeOnTile(darkness, tiles.getTileLocation(129, 1))
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    MIGAMII,
    assets.animation`walking east`,
    200,
    true
    )
    animation.runImageAnimation(
    darkness,
    assets.animation`walking right`,
    200,
    true
    )
    animation.runImageAnimation(
    aqua,
    assets.animation`aqua walking right`,
    200,
    true
    )
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`triger`, function (sprite, location) {
    story.startCutscene(function () {
        story.cancelSpriteMovement(sprite)
        enemy_1 = sprites.create(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `, SpriteKind.Enemy)
        tiles.placeOnTile(enemy_1, tiles.getTileLocation(56, 5))
        scene.cameraShake(4, 500)
        scene.cameraFollowSprite(enemy_1)
        enemy_HP.attachToSprite(enemy_1)
        pause(1000)
        scene.cameraFollowSprite(darkness)
        music.spooky.play()
    })
    story.cancelCurrentCutscene()
    tiles.replaceAllTiles(assets.tile`triger`, sprites.castle.tilePath5)
})
function swiching_charicters () {
    CodeSequence += 1
    if (CodeSequence == 1) {
        controller.moveSprite(darkness)
        statusbar.attachToSprite(darkness)
        scene.cameraFollowSprite(darkness)
        music.magicWand.play()
    } else if (CodeSequence == 2) {
        controller.moveSprite(MIGAMII)
        statusbar.attachToSprite(MIGAMII)
        scene.cameraFollowSprite(MIGAMII)
        music.baDing.play()
    } else if (CodeSequence == 3) {
        controller.moveSprite(aqua)
        statusbar.attachToSprite(aqua)
        scene.cameraFollowSprite(aqua)
        music.pewPew.play()
    } else if (CodeSequence == 4) {
        music.bigCrash.play()
        CodeSequence = 1
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    MIGAMII,
    assets.animation`migamii walking down`,
    200,
    true
    )
    animation.runImageAnimation(
    darkness,
    assets.animation`darkness walking down`,
    200,
    true
    )
    animation.runImageAnimation(
    aqua,
    assets.animation`aqua walking down 1`,
    200,
    true
    )
})
let wave_attack: Sprite = null
let exploshion_1: Sprite = null
let weapon_menu = 0
let common_item_generation = 0
let CodeSequence = 0
let attack_weapon_aqua = 0
let enemy_HP: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let chest_opening: Sprite = null
let enemy_1: Sprite = null
let aqua: Sprite = null
let MIGAMII: Sprite = null
let darkness: Sprite = null
darkness = sprites.create(assets.image`darkness0`, SpriteKind.Player)
MIGAMII = sprites.create(assets.image`migamii`, SpriteKind.follower)
aqua = sprites.create(assets.image`aqua`, SpriteKind.follower)
enemy_1 = sprites.create(assets.image`guard enemy 1`, SpriteKind.Enemy)
chest_opening = sprites.create(assets.image`chest closed`, SpriteKind.chest)
let _dungeonentrance1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
enemy_1.setPosition(13, 123)
tiles.setTilemap(tilemap`level1`)
tiles.createSpritesOnTiles(sprites.dungeon.chestClosed, SpriteKind.chest)
scene.setBackgroundColor(7)
scene.cameraFollowSprite(darkness)
controller.moveSprite(darkness)
darkness.setStayInScreen(true)
MIGAMII.follow(darkness, 85)
aqua.follow(darkness, 80)
statusbar = statusbars.create(20, 4, StatusBarKind.Health)
statusbar.attachToSprite(darkness)
statusbar.setBarBorder(1, 12)
statusbar.setLabel("HP")
statusbar.setColor(7, 2, 3)
enemy_HP.attachToSprite(enemy_1)
statusbar.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
attack_weapon_aqua = 1
CodeSequence = 1
tiles.createSpritesOnTiles(sprites.builtin.forestTiles0, SpriteKind.enviroment_1)
tiles.coverAllTiles(assets.tile`transparency16`, sprites.castle.tileGrass1)
tiles.coverAllTiles(sprites.builtin.forestTiles4, sprites.castle.tileGrass3)
tiles.createSpritesOnTiles(assets.tile`myTile0`, SpriteKind.river)
game.onUpdateInterval(2000, function () {
    statusbar.value += 2
})
game.onUpdateInterval(100, function () {
    if (characterAnimations.matchesRule(aqua, characterAnimations.rule(Predicate.NotMoving))) {
        animation.runImageAnimation(
        aqua,
        assets.animation`aqua idle south`,
        1000,
        true
        )
    }
})
