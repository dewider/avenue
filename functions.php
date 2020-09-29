<?php
/**
 * avenue functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package avenue
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'avenue_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function avenue_setup() {

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'header-menu' => esc_html__( 'header', 'Header menu' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
				'menus',
			)
		);

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);

		add_theme_support('woocommerce');
	}
endif;
add_action( 'after_setup_theme', 'avenue_setup' );

/**
 * Enqueue scripts and styles.
 */
function avenue_scripts() {
	wp_enqueue_style( 'font-awesome-5', 'https://use.fontawesome.com/releases/v5.14.0/css/all.css', array(), _S_VERSION );
	wp_enqueue_style( 'avenue-style', get_stylesheet_uri(), array(), _S_VERSION );
	//wp_style_add_data( 'avenue-style', 'rtl', 'replace' );

	// jQuery.cookie для WOOCS
	wp_enqueue_script('jquery');
	wp_enqueue_script('jquery-cookie', '//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js');
	
	wp_enqueue_script('main', get_template_directory_uri() . '/js/avenue.js');

}
add_action( 'wp_enqueue_scripts', 'avenue_scripts' );

require_once 'inc/custom.php';
require_once 'inc/api.php';