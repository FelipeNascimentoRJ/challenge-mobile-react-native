export default interface ITheme {
  title: 'light' | 'dark';
  status: 'dark-content' | 'light-content';
  primary: string;
  background: string;
  heading: string;
  text: string;
  textButton: string;
  icon: string;
  shape: string;
  border: string;
  radius: number;
};

export interface IThemeExport {
  theme: ITheme;
  themeToggle?: () => void;
}
