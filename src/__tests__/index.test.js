import React from 'react';
import Enzyme from 'enzyme';
//import { render } from '@testing-library/react';
//import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Home from '../../pages/index';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Index page tests', () => {
    it('Should match snapshot', () => {
      const home = renderer.create(<Home/>).toJSON();
      expect(home).toMatchSnapshot();
    });
});