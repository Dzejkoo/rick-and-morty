import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'templateFunc',
  pure: true,
})
export class TemplateFuncPipe implements PipeTransform {
  transform<T, R>(func: (arg: T) => R, arg: T): R {
    return func(arg);
  }
}
