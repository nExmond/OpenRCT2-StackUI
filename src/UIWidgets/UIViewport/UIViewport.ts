/// <reference path="../UIWidget.ts" />
/// <reference path="UIViewportFlag.ts" />
/// <reference path="UIViewportScale.ts" />
/// <reference path="UIViewportAngle.ts" />

/**
 * Widget to display park elements.
 */
class UIViewport extends UIWidget<ViewportWidget> {

    protected _viewport!: Viewport;
    protected _rotation: UIViewportAngle = ui.mainViewport.rotation;
    protected _zoom: UIViewportScale = ui.mainViewport.zoom;
    protected _visibilityFlags: UIViewportFlag = UIViewportFlag.None;

    protected _position: CoordsXY | CoordsXYZ = ui.mainViewport.getCentrePosition();

    constructor() {
        super();
    }

    //Convenience

    /**
     * Create *UIViewport* instance without using new.
     */
    static $(): UIViewport {
        const viewport = new UIViewport();
        return viewport.minSize(100);
    }

    //Private

    _build() {
        this._viewport = <Viewport>{
            left: this._origin.x,
            top: this._origin.y,
            right: this._origin.x + (this._size.width ?? 0),
            bottom: this._origin.y + (this._size.height ?? 0),
            rotation: this._rotation,
            zoom: this._zoom,
            visibilityFlags: this._visibilityFlags
        }
        this._widget = {
            ...this._buildBaseValues(),
            type: "viewport",
            viewport: this._viewport
        }
    }

    protected _update(widget: ViewportWidget) {
        super._update(widget);
        this._viewport.left = this._origin.x;
        this._viewport.top = this._origin.y;
        this._viewport.right = this._origin.x + (this._size.width ?? 0);
        this._viewport.bottom = this._origin.y + (this._size.height ?? 0);
        this._viewport.rotation = this._rotation;
        this._viewport.zoom = this._zoom;
        this._viewport.visibilityFlags = this._visibilityFlags;
        this.moveTo(this._position);
    }

    _loadWidget() {
        super._loadWidget();

        this._viewport = this._widget.viewport!;

        this._zoom = ui.mainViewport.zoom;
        this._viewport.zoom = this._zoom;

        this._viewport.visibilityFlags = this._visibilityFlags;

        this.moveTo(this._position);
    }

    //Public

    /**
     * Set the center coordinate of the map displayed by the viewport.
     */
    position(val: CoordsXY | CoordsXYZ): this {
        this._position = val;
        return this;
    }

    getPosition(): CoordsXY | CoordsXYZ {
        return this._position;
    }

    /**
     * Sets the angle of rotation of the viewport.
     * ! Screen coordinates of viewports other than this viewport may be moved abnormally. It's a bug in openrct2.
     */
    rotation(val: UIViewportAngle): this {
        this._rotation = val;
        return this;
    }

    getRotation(): UIViewportAngle {
        return this._rotation;
    }

    /**
     * Sets the zoom level of the map displayed by the viewport.
     * @param val 
     * @returns zoom 
     */
    zoom(val: UIViewportScale): this {
        this._zoom = val;
        return this;
    }

    getZoom(): UIViewportScale {
        return this._zoom;
    }

    /**
     * Sets the category of elements to be displayed in the viewport.
     */
    flags(val: UIViewportFlag): this {
        this._visibilityFlags = val;
        return this;
    }

    getFlags(): UIViewportFlag {
        return this._visibilityFlags;
    }

    /**
     * Gets center position
     */
    getCenterPosition(): CoordsXY | undefined {
        return this._viewport.getCentrePosition();
    }

    /**
     * Updates the location of the map displayed by the viewport.
     */
    moveTo(val: CoordsXY | CoordsXYZ) {
        this._position = val;
        if (typeof this._viewport?.moveTo !== "undefined") {
            this._viewport.moveTo(val);
        }
    }

    /**
     * Moves the location of the map displayed by the viewport smoothly.
     */
    scrollTo(val: CoordsXY | CoordsXYZ) {
        this._position = val;
        if (typeof this._viewport?.scrollTo !== "undefined") {
            this._viewport.scrollTo(val);
        }
    }

    /**
     * Smoothly moves the location of the map displayed by the current viewport to the location of the main viewport.
     */
    scrollToMainViewportCenter() {
        this.scrollTo(ui.mainViewport.getCentrePosition());
    }

    /**
     * Moves the location of the map displayed by the current viewport to the location of the main viewport.
     */
    moveToMainViewportCenter() {
        this.moveTo(ui.mainViewport.getCentrePosition());
    }

    /**
     * Smoothly moves the location of the map displayed by the main viewport to the location of the current viewport.
     */
    mainViewportScrollToThis() {
        if (typeof this._viewport !== "undefined") {
            ui.mainViewport.scrollTo(this.getCenterPosition()!);
        }
    }
}
