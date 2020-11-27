## MARVEL POC Application.

## A> How to start.

1. clone repo from github.
2. follow below steps.
   cd <Project_folder>
   npm install
   npm start.
3. Go to 'http://localhost:3000/' and check the application is working or not.

## B> Added Dependencies.

axios:^0.19.2,
classnames:^2.2.6,
primeicons:^4.0.0,
primereact:^4.2.2,
prop-types:^15.7.2,
react:^16.13.1,
react-dom:^16.13.1,
react-keyboard-event-handler:^1.5.4,
react-keyboard-shortcuts:^1.1.3,
react-redux:^7.2.1,
react-scripts:3.4.1,
redux:^4.0.5,
redux-logger:^3.0.6,
redux-thunk:^2.3.0,

## C> How to use i18next translator

1. Use hoc for class based components
   class LegacyWelcomeClass extends Component {
   render() {
   const { t } = this.props;
   return <h2>{t('title')}</h2>;
   }
   }
   export default withTranslation()(LegacyWelcomeClass);

2. Component using the Trans component
   function MyComponent() {
   return (
   <Trans i18nKey="description.part1">
   To get started, edit <code>src/App.js</code> and save to reload.
   </Trans>
   );
   }

3. Import statement
   import { useTranslation, withTranslation, Trans } from 'react-i18next';

   check commit test
