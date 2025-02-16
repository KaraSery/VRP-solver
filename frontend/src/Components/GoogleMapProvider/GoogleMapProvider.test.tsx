import { render, screen, waitFor } from '@testing-library/react';
import { GoogleMapProvider, GoogleMapContext } from './GoogleMapProvider';

import {useContext} from 'react';
import {describe, it, expect} from "vitest";
import {Loader} from "@googlemaps/js-api-loader"

describe('GoogleMapProvider', () => {
    it('should provide the correct loading state', async () => {
        // Component to consume the context value and display the loading state
        const TestComponent = () => {
            const isLoaded = useContext(GoogleMapContext);
            return <div>{isLoaded ? 'Loaded' : 'Loading...'}</div>;
        };
        const loader = new Loader({
            apiKey: '',
        })
        loader.importLibrary = (() => Promise.resolve()) as any;
        render(
            <GoogleMapProvider loader={loader}>
                <TestComponent />
            </GoogleMapProvider>
        );
        // Initially, should display 'Loading...'
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // Wait for the loading state to change after the API is loaded
        await waitFor(() => {
            expect(screen.getByText('Loaded')).toBeInTheDocument();
        }, {timeout: 4000});
    });
});
