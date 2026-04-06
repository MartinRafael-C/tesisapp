declare module '@expo/vector-icons' {
    import * as React from 'react';
    import { TextProps } from 'react-native';
    
    class Icon extends React.Component<TextProps & { name: string; size?: number; color?: string }> {}
    
    export const Ionicons: typeof Icon;
    export const MaterialIcons: typeof Icon;
    export const FontAwesome: typeof Icon;
    export const FontAwesome5: typeof Icon;
    export const Feather: typeof Icon;
    export const Entypo: typeof Icon;
  }