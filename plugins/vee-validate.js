import { extend } from "vee-validate";
import { required, email, confirmed} from "vee-validate/dist/rules";

extend('required', {
    ...required,
    message: 'The {_field_} field is required'
});

extend('email', {
    ...email,
    message: 'The Email field must be valid email'
})

extend('min', {
    validate: (value, { length }) => {
        return value.length >= length 
    },
    params: ['length'],
    message: 'The {_field_} field must have at least {length} characters'
})

extend('confirmed', {
    ...confirmed,
    message: 'The Password Confirmation field confirmation does not match'
})