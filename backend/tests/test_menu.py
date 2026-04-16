import pytest
import sys
import os
from unittest.mock import AsyncMock, patch
import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestGetUserMenus:
    @pytest.mark.asyncio
    async def test_get_user_menus_returns_menu_tree(self):
        from app.services.menu import get_user_menus

        with patch("app.services.menu.fetch_df", new_callable=AsyncMock) as mock_fetch:
            mock_fetch.return_value = pd.DataFrame(
                [
                    {
                        "menu_id": 1,
                        "menu_nm": "Dashboard",
                        "parent_menu_id": None,
                        "sort_order": 1,
                    },
                    {
                        "menu_id": 2,
                        "menu_nm": "Analytics",
                        "parent_menu_id": 1,
                        "sort_order": 1,
                    },
                ]
            )

            result = await get_user_menus(user_cd=123)

            assert "menu_tree" in result
            assert isinstance(result["menu_tree"], list)
            assert len(result["menu_tree"]) == 2


class TestMenuServiceEndpoint:
    @pytest.mark.asyncio
    async def test_get_user_menus_endpoint_requires_auth(self):
        from fastapi.testclient import TestClient
        from app.main import app

        client = TestClient(app)
        response = client.get("/api/users/me/menus")
        assert response.status_code == 401

    @pytest.mark.asyncio
    async def test_get_user_menus_endpoint_with_auth(self, mock_settings):
        from fastapi.testclient import TestClient
        from app.main import app
        from app.services.auth import create_access_token
        import pandas as pd

        token = create_access_token(data={"sub": "123", "univ_nm": "Test University"})

        with patch("app.services.menu.fetch_df", new_callable=AsyncMock) as mock_fetch:
            mock_fetch.return_value = pd.DataFrame(
                [
                    {
                        "menu_id": 1,
                        "menu_nm": "Dashboard",
                        "parent_menu_id": None,
                        "sort_order": 1,
                    },
                    {
                        "menu_id": 2,
                        "menu_nm": "Analytics",
                        "parent_menu_id": 1,
                        "sort_order": 1,
                    },
                ]
            )

            client = TestClient(app)
            response = client.get(
                "/api/users/me/menus", headers={"Authorization": f"Bearer {token}"}
            )

            assert response.status_code == 200
            data = response.json()
            assert "menu_tree" in data
            assert isinstance(data["menu_tree"], list)
