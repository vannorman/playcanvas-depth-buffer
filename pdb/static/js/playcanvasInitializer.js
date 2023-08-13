document.addEventListener("DOMContentLoaded", () => {
    // from: https://playcanvas.github.io/#/physics/falling-shapes
    const canvas = document.getElementById('application');
    const deviceType = 'webgl2';
    files = {};
    data = {};
    example(canvas,deviceType, files, data);
});

function example(canvas, deviceType, files, data) {
    const assets = {
        terrain: new pc.Asset("terrain", "container", {
            url: "/static/assets/models/terrain.glb",
        }),
    };

    const gfxOptions = {
        deviceTypes: [deviceType],
        glslangUrl: "/static/lib/glslang/glslang.js",
        twgslUrl: "/static/lib/twgsl/twgsl.js",
    };

    pc.createGraphicsDevice(canvas, gfxOptions).then((device) => {
        const createOptions = new pc.AppOptions();
        createOptions.graphicsDevice = device;
        createOptions.mouse = new pc.Mouse(document.body);
        createOptions.touch = new pc.TouchDevice(document.body);

        createOptions.componentSystems = [
            // @ts-ignore
            pc.RenderComponentSystem,
            // @ts-ignore
            pc.CameraComponentSystem,
            // @ts-ignore
            pc.LightComponentSystem,
            // @ts-ignore
            pc.ScriptComponentSystem,
        ];

        createOptions.resourceHandlers = [
            // @ts-ignore
            pc.TextureHandler,
            // @ts-ignore
            pc.ContainerHandler,
            // @ts-ignore
            pc.ScriptHandler,
        ];

        const app = new pc.AppBase(canvas);
        app.init(createOptions);

        // Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
        app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
        app.setCanvasResolution(pc.RESOLUTION_AUTO);

        const assetListLoader = new pc.AssetListLoader(
            Object.values(assets),
            app.assets
        );
        assetListLoader.load(() => {
            app.start();


            // instantiate the terrain
            const terrain = assets.terrain.resource.instantiateRenderEntity();
            terrain.setLocalScale(30, 30, 30);
            app.root.addChild(terrain);


            // create an Entity with a camera component
            const camera = new pc.Entity();
            camera.addComponent("camera", {
                clearColor: new pc.Color(150 / 255, 213 / 255, 63 / 255),
                farClip: 1000,
            });


            app.root.addChild(camera);

            // enable the camera to render the scene's depth map.
            camera.camera.requestSceneDepthMap(true);

            app.on("update", function (dt) {

                // debug rendering of the deptht texture in the corner
                app.drawDepthTexture(0.7, -0.7, 0.5, -0.5);
            });
        });
    });
}
