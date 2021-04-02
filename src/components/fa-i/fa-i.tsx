import { Component, Host, h, Prop } from '@stencil/core';
import {icon as fIcon, IconDefinition} from '@fortawesome/fontawesome-svg-core';


@Component({
  tag: 'fa-i',
  shadow: true,
  //styleUrl: `fa-i.css`,
  styles: `svg {width: auto; height: 1em;}`
})
export class FaI {

  @Prop()
  public icon: IconDefinition

  render() {
    return (
      <Host>
        <span innerHTML={fIcon(this.icon).html as any}></span>
      </Host>
    );
  }

}
