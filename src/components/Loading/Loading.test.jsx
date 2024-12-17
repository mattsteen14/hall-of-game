import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import '@testing-library/jest-dom'
import { Loading } from "./Loading";

describe('Loading component', () => {
    test('renders the Loading component', () => {
        render(
            <Loading />
        );
        expect(screen.getByTestId('loading')).toBeInTheDocument();
    })
})