/**
 * AngularJS service for simple translation (compatible with Drupal)
 *
 * @author Hein Bekker <hein@netbek.co.za>
 * @copyright (c) 2015 Hein Bekker
 * @license http://www.gnu.org/licenses/agpl-3.0.txt AGPLv3
 */

(function (window, angular, undefined) {
	'use strict';

	angular
		.module('nb.i18n', [])
		.provider('nbI18N', nbI18N);

	function nbI18N () {
		return {
			$get: function () {
				/**
				 *
				 * @param {string} str
				 * @param {object} args
				 * @returns {string}
				 */
				function formatString (str, args) {
					angular.forEach(args, function (value, key) {
						str = str.replace(key, value);
					});
					return str;
				}

				return {
					/**
					 * Translates a string to the current language or to a given language.
					 *
					 * Translating variables:
					 * !variable, which indicates that the text should be inserted as-is. This is useful for inserting variables into things like e-mail.
					 * @variable, which indicates that the text should be run through check_plain, to escape HTML characters. Use this for any output that's displayed within a Drupal page.
					 * %variable, which indicates that the string should be HTML escaped and highlighted with theme_placeholder() which shows up by default as emphasized.
					 *
					 * @param {string} str
					 * @param {object} args
					 * @param {object} options
					 * @returns {string}
					 */
					t: function (str, args, options) {
						if (angular.isObject(args)) {
							str = formatString(str, args);
						}
						return str;
					}
				};
			}
		};
	}
})(window, window.angular);