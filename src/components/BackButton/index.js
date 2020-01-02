import Router from 'next/router';
import Button from '@material-ui/core/Button';
import {useStyles} from './style';

export default function BackButton() {


    return (
        <Button onClick={() => Router.back()}>Go Back</Button>
    )
}