/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { Appearance } from '@microsoft/mixed-reality-extension-sdk';

/**
 * The main class of this app. All the logic goes here.
 */
/* eslint-disable no-unused-vars */
export default class HelloWorld {
	private text: MRE.Actor = null;
	private cube: MRE.Actor = null;
	private assets: MRE.AssetContainer;
	private button: MRE.Actor = null;

	constructor(private context: MRE.Context) {
		this.context.onStarted(() => this.started());
	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private async started() {
		// set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
		this.assets = new MRE.AssetContainer(this.context);

		// Create a new actor with no mesh, but some text.
		this.text = MRE.Actor.Create(this.context, {
			actor: {
				name: 'Text',
				transform: {
					app: { position: { x: 0, y: 0.5, z: 0 } }
				},
				text: {
					contents: "T-Shirt: $14.99",
					anchor: MRE.TextAnchorLocation.MiddleCenter,
					color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
					height: 0.3
				},
				appearance: {
                    enabled: false
                }
			}
		});
		// spawn a copy of the glTF model
		this.cube = MRE.Actor.CreateFromLibrary(this.context, {
			// using the data we loaded earlier
			//firstPrefabFrom: cubeData,
			resourceId: 'artifact:2061130281330410434',
			// Also apply the following generic actor properties.
			actor: {
				name: 'Shirt',
				// Parent the glTF model to the text actor, so the transform is relative to the text
				//parentId: this.text.id,
				transform: {
					local: {
						position: { x: 0, y: -1, z: 0 },
						scale: { x:1, y: 1, z: 1 }
					}
				}
			}
		});
		// Create an invisible cube with a collider
        this.button = MRE.Actor.CreatePrimitive(this.assets, {
            definition: {
                shape: MRE.PrimitiveShape.Box,
                dimensions: { x: 0.4, y: 0.4, z: 0.4 } // make sure there's a gap
            },
            addCollider: true,
            actor: {
                transform: {
                    local: {
                        position: { x: 0, y: -1, z: 0 },
                        scale: { x: 3, y: 3, z: 3 } // not affected by custom scale
                    }
                },
                appearance: {
                    enabled: false
                }
            }
        });
		//this.button.setBehavior(MRE.ButtonBehavior).onClick(this.text.appearance.enabled(value:true));
		
		this.button.setBehavior(MRE.ButtonBehavior).onClick(() =>
			this.ToggleShirt());
		
		
	}

	private ToggleShirt()
	{
		if(this.text.appearance.enabled === true)
		{
			this.text.appearance.enabled = false;
		}
		else{
			this.text.appearance.enabled = true;
		}
	}
}

