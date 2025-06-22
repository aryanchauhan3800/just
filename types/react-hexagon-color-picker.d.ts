declare module 'react-hexagon-color-picker' {
    import * as React from 'react';

    interface HexagonalColorPickerProps {
        hue: number;
        color: string;
        onColorChange: (color: string) => void;
        // onColorClick: (event: React.MouseEvent, color: string) => void;
    }

    interface HexagonalColorHueProps {
        hue: number;
        onHueChange: (hue: number) => void;
    }

    export const HexagonalColorPicker: React.FC<HexagonalColorPickerProps>;
    export const HexagonalColorHue: React.FC<HexagonalColorHueProps>;
}
