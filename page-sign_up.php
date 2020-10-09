<?php
/**
 * The brand page temlate
 *
 * @package avenue
 * 
 * Template Name: Sign Up
 */

get_header();
?>

<div class="menu-placeholder"></div>
<div class="top-banner-internal">
    <div class="top-banner-internal__text">
        <div class="top-banner-internal__title">
            <h1><span class="bold">WELCOME</span> TO AVE</h1>
        </div>
        <p>SIGN IN OR REGISTER</p>
    </div>
</div>
<div class="container">
    <div class="login">
        <div class="login__sign-in">
            <div class="login-form">
                <form action="/wp-login.php" method="post">
                    <label for="">SIGN IN</label>
                    <input type="text" name="log" placeholder="Your Email..">
                    <input type="password" name="pwd" placeholder="Your password..">
                    <div class="login-form__buttons">
                        <div class="login-form__buttons-left">
                            <input type="submit" class="transparrent-button" value="SIGN IN">
                        </div>
                        <div class="login-form__buttons-right">
                            <a href="#">Forgot your Password<i class="fas fa-long-arrow-alt-right"></i></a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="login__register">
            <div class="login-form">
                <form action="/wp-login.php" method="post">
                    <label for="">REGISTER</label>
                    <input name="email" type="text" placeholder="Your Email..">
                    <input name="pass" type="text" placeholder="Your password..">
                    <input name="confirm_pass" type="text" placeholder="Confirm password..">
                    <div class="login-form__confirm">
                        <input name="sign_updates" type="checkbox">
                        <span>Sign up for exclusive updates, discounts, new arrivals, contests, and more!</span>
                    </div>
                    <div class="login-form__buttons">
                        <div class="login-form__buttons-left login-form__submit">
                            <button class="transparrent-button">CREATE ACCOUNT</button>
                        </div>
                        <div class="login-form__buttons-right">
                            <span>By clicking ‘Create Account’, you agree to our <a href="#">Privacy Policy<i class="fas fa-long-arrow-alt-right"></i></a></span>
                        </div>
                    </div>
                    <div class="login-form__error-message"></div>
                </form>
            </div>
        </div>
    </div>
</div><!-- container -->

<div class="container">

</div>

<?php
get_footer();