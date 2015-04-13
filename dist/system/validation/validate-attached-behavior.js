System.register(['aurelia-dependency-injection', 'aurelia-templating'], function (_export) {
  var inject, customAttribute, Behavior, _classCallCheck, _createClass, ValidateAttachedBehavior;

  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaTemplating) {
      customAttribute = _aureliaTemplating.customAttribute;
      Behavior = _aureliaTemplating.Behavior;
    }],
    execute: function () {
      'use strict';

      _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

      _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

      ValidateAttachedBehavior = (function () {
        function ValidateAttachedBehavior(element) {
          _classCallCheck(this, _ValidateAttachedBehavior);

          this.element = element;
          this.processedValidation = null;
          this.viewStrategy = null;
        }

        _createClass(ValidateAttachedBehavior, [{
          key: 'valueChanged',
          value: function valueChanged(newValue) {
            if (this.value === null || this.value === undefined) {
              return;
            }this.processedValidation = this.value;
            if (typeof this.value === 'string') {
              return;
            } else {
              this.subscribeChangedHandlers(this.element);
            }
          }
        }, {
          key: 'subscribeChangedHandlers',
          value: function subscribeChangedHandlers(currentElement) {
            var _this = this;

            this.viewStrategy = this.value.config.getViewStrategy();
            var validationProperty = this.viewStrategy.getValidationProperty(this.value, currentElement);
            if (validationProperty !== null && validationProperty !== undefined) {
              debugger;
              this.viewStrategy.prepareElement(validationProperty, currentElement);
              validationProperty.onValidate(function (vp) {
                _this.viewStrategy.updateElement(vp, currentElement);
              });
            }
            var children = currentElement.children;
            for (var i = 0; i < children.length; i++) {
              this.subscribeChangedHandlers(children[i]);
            }
          }
        }, {
          key: 'detached',
          value: function detached() {}
        }, {
          key: 'attached',
          value: function attached() {
            if (this.processedValidation === null || this.processedValidation === undefined) this.valueChanged(this.value);
          }
        }]);

        var _ValidateAttachedBehavior = ValidateAttachedBehavior;
        ValidateAttachedBehavior = customAttribute('validate')(ValidateAttachedBehavior) || ValidateAttachedBehavior;
        ValidateAttachedBehavior = inject(Element)(ValidateAttachedBehavior) || ValidateAttachedBehavior;
        return ValidateAttachedBehavior;
      })();

      _export('ValidateAttachedBehavior', ValidateAttachedBehavior);
    }
  };
});