import {
  AccessMember,
  AccessScope,
  AccessKeyed,
  BindingBehavior,
  Expression,
  ValueConverter
} from 'aurelia-binding';

function getObject(expression: Expression, objectExpression: Expression, source: any): null | undefined | Object {
  let value = objectExpression.evaluate(source, <any>null);
  if (value === null || value === undefined || value instanceof Object) {
    return value;
  }
  /* tslint:disable */
  throw new Error(`The '${objectExpression}' part of '${expression}' evaluates to ${value} instead of an object, null or undefined.`);
  /* tslint:enable */
}

/**
 * Retrieves the object and property name for the specified expression.
 * @param expression The expression
 * @param source The scope
 */
export function getPropertyInfo(expression: Expression, source: any): { object: Object; propertyName: string; } | null {
  const originalExpression = expression;
  while (expression instanceof BindingBehavior || expression instanceof ValueConverter) {
    expression = expression.expression;
  }

  let object: null | undefined | Object;
  let propertyName: string;
  let ruleSrc = null;
  if (expression instanceof AccessScope) {
    object = source.bindingContext;
    propertyName = expression.name;
  } else if (expression instanceof AccessMember) {
    object = getObject(originalExpression, expression.object, source);
    propertyName = expression.name;
    if (expression.object) {
        // build the path to the property from the object root.
        let exp: any = expression.object;
        while (exp.object) {
            propertyName = exp.name + '.' + propertyName;
            exp = exp.object;
        }
        ruleSrc = <any>getObject(originalExpression, exp, source);
    }
  } else if (expression instanceof AccessKeyed) {
    object = getObject(originalExpression, expression.object, source);
    propertyName = expression.key.evaluate(source);
  } else {
    throw new Error(`Expression '${originalExpression}' is not compatible with the validate binding-behavior.`);
  }
  if (object === null || object === undefined) {
    return null;
  }
  return { object, propertyName };
}
