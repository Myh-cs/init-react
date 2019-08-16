import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Link from './link.jsx';

storiesOf('pages/Todo/components', module).add('footer', () => {
    const props = {
        selected: boolean("selected", true),
        onClick: action('onClick'),
    }
    return <Link {...props} />
});


