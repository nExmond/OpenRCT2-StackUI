
/**
 * Element flags displayed in the viewport.
 * * ex) All Heights: **UIViewportFlag.LandHeights | UIViewportFlag.TrackHeights | UIViewportFlag.PathHeights**
 */
enum UIViewportFlag {
    None = 0,
    UndergroundInside = 1 << 0,
    SeethroughRides = 1 << 1,
    SeethroughScenery = 1 << 2,
    InvisibleSupports = 1 << 3,
    LandHeights = 1 << 4,
    TrackHeights = 1 << 5,
    PathHeights = 1 << 6,
    Gridlines = 1 << 7,
    LandOwnership = 1 << 8,
    ConstructionRights = 1 << 9,
    SoundOn = 1 << 10,
    InvisiblePeeps = 1 << 11,
    HideBase = 1 << 12,
    HideVertical = 1 << 13,
    InvisibleSprites = 1 << 15,
    Unknown = 1 << 15,
    SeethroughPaths = 1 << 16,
    ClipView = 1 << 17,
    HighlightPathIssues = 1 << 18,
    TransparentBackground = 1 << 19,
}
