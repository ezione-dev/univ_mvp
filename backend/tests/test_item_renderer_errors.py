import pytest
import sys
import os
from unittest.mock import AsyncMock, patch, MagicMock

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestRenderItemErrorHandling:
    @pytest.mark.asyncio
    async def test_sql_error_capture_returns_success_false(self):
        from app.services.item_renderer import render_item

        with patch("app.services.item_renderer.get_item", new_callable=AsyncMock) as mock_get_item, \
             patch("app.services.item_renderer.get_contents_master", new_callable=AsyncMock) as mock_get_master, \
             patch("app.services.item_renderer.get_contents_detail", new_callable=AsyncMock) as mock_get_detail, \
             patch("app.services.item_renderer.execute_sql_preview", new_callable=AsyncMock) as mock_exec_sql:

            mock_get_item.return_value = {
                "item_id": 1,
                "item_nm": "테스트 아이템",
                "shape_cnts_id": 1,
                "sql_cnts_id": 2,
                "mapping_json": {"type": "grid", "mapping": {"columns": [{"dataKey": "col1", "field": "col1"}]}}
            }

            mock_shape_master = MagicMock()
            mock_shape_master.cnts_tp = "grid"
            mock_get_master.side_effect = [mock_shape_master, MagicMock(user_sql="SELECT * FROM t")]
            mock_get_detail.return_value = {"columns": [{"dataKey": "col1", "header": "컬럼1"}]}
            mock_exec_sql.side_effect = Exception("sql_execution_error: syntax error at line 1")

            result = await render_item(1, ctx={"base_year": 2025}, caller_roles=["SYS_ADM"])

            assert result["success"] is False
            assert "syntax error" in result["error_msg"]
            assert result["type"] is None
            assert result["item_id"] == 1

    @pytest.mark.asyncio
    async def test_admin_keeps_detailed_error_message(self):
        from app.services.item_renderer import render_item

        with patch("app.services.item_renderer.get_item", new_callable=AsyncMock) as mock_get_item, \
             patch("app.services.item_renderer.get_contents_master", new_callable=AsyncMock) as mock_get_master, \
             patch("app.services.item_renderer.get_contents_detail", new_callable=AsyncMock) as mock_get_detail, \
             patch("app.services.item_renderer.execute_sql_preview", new_callable=AsyncMock) as mock_exec_sql:

            mock_get_item.return_value = {
                "item_id": 1,
                "item_nm": "테스트 아이템",
                "shape_cnts_id": 1,
                "sql_cnts_id": 2,
                "mapping_json": {"type": "grid", "mapping": {"columns": [{"dataKey": "col1", "field": "col1"}]}}
            }

            mock_shape_master = MagicMock()
            mock_shape_master.cnts_tp = "grid"
            mock_get_master.side_effect = [mock_shape_master, MagicMock(user_sql="SELECT * FROM t")]
            mock_get_detail.return_value = {"columns": [{"dataKey": "col1", "header": "컬럼1"}]}
            mock_exec_sql.side_effect = Exception("sql_execution_error: table not found")

            result = await render_item(1, ctx={"base_year": 2025}, caller_roles=["SYS_ADM"])

            assert result["success"] is False
            assert "table not found" in result["error_msg"]

    @pytest.mark.asyncio
    async def test_non_admin_masks_error_message(self):
        from app.services.item_renderer import render_item

        with patch("app.services.item_renderer.get_item", new_callable=AsyncMock) as mock_get_item, \
             patch("app.services.item_renderer.get_contents_master", new_callable=AsyncMock) as mock_get_master, \
             patch("app.services.item_renderer.get_contents_detail", new_callable=AsyncMock) as mock_get_detail, \
             patch("app.services.item_renderer.execute_sql_preview", new_callable=AsyncMock) as mock_exec_sql:

            mock_get_item.return_value = {
                "item_id": 1,
                "item_nm": "테스트 아이템",
                "shape_cnts_id": 1,
                "sql_cnts_id": 2,
                "mapping_json": {"type": "grid", "mapping": {"columns": [{"dataKey": "col1", "field": "col1"}]}}
            }

            mock_shape_master = MagicMock()
            mock_shape_master.cnts_tp = "grid"
            mock_get_master.side_effect = [mock_shape_master, MagicMock(user_sql="SELECT * FROM t")]
            mock_get_detail.return_value = {"columns": [{"dataKey": "col1", "header": "컬럼1"}]}
            mock_exec_sql.side_effect = Exception("sql_execution_error: table not found")

            result = await render_item(1, ctx={"base_year": 2025}, caller_roles=["USER"])

            assert result["success"] is False
            assert result["error_msg"] == "데이터 조회 중 문제가 발생했습니다."
            assert "table not found" not in result["error_msg"]

    @pytest.mark.asyncio
    async def test_no_caller_roles_masks_error_message(self):
        from app.services.item_renderer import render_item

        with patch("app.services.item_renderer.get_item", new_callable=AsyncMock) as mock_get_item, \
             patch("app.services.item_renderer.get_contents_master", new_callable=AsyncMock) as mock_get_master, \
             patch("app.services.item_renderer.get_contents_detail", new_callable=AsyncMock) as mock_get_detail, \
             patch("app.services.item_renderer.execute_sql_preview", new_callable=AsyncMock) as mock_exec_sql:

            mock_get_item.return_value = {
                "item_id": 1,
                "item_nm": "테스트 아이템",
                "shape_cnts_id": 1,
                "sql_cnts_id": 2,
                "mapping_json": {"type": "grid", "mapping": {"columns": [{"dataKey": "col1", "field": "col1"}]}}
            }

            mock_shape_master = MagicMock()
            mock_shape_master.cnts_tp = "grid"
            mock_get_master.side_effect = [mock_shape_master, MagicMock(user_sql="SELECT * FROM t")]
            mock_get_detail.return_value = {"columns": [{"dataKey": "col1", "header": "컬럼1"}]}
            mock_exec_sql.side_effect = Exception("sql_execution_error: table not found")

            result = await render_item(1, ctx={"base_year": 2025})

            assert result["success"] is False
            assert result["error_msg"] == "데이터 조회 중 문제가 발생했습니다."


class TestRenderItemBaseYearPlaceholder:
    @pytest.mark.asyncio
    async def test_has_base_year_placeholder_true(self):
        from app.services.item_renderer import render_item

        with patch("app.services.item_renderer.get_item", new_callable=AsyncMock) as mock_get_item, \
             patch("app.services.item_renderer.get_contents_master", new_callable=AsyncMock) as mock_get_master, \
             patch("app.services.item_renderer.get_contents_detail", new_callable=AsyncMock) as mock_get_detail, \
             patch("app.services.item_renderer.execute_sql_preview", new_callable=AsyncMock) as mock_exec_sql:

            mock_get_item.return_value = {
                "item_id": 1,
                "item_nm": "테스트 아이템",
                "shape_cnts_id": 1,
                "sql_cnts_id": 2,
                "mapping_json": {"type": "grid", "mapping": {"columns": [{"dataKey": "col1", "field": "col1"}]}}
            }

            mock_shape_master = MagicMock()
            mock_shape_master.cnts_tp = "grid"
            mock_get_master.side_effect = [
                mock_shape_master,
                MagicMock(user_sql="SELECT * FROM t WHERE year = {{base_year}}")
            ]
            mock_get_detail.return_value = {"columns": [{"dataKey": "col1", "header": "컬럼1"}]}
            mock_exec_sql.return_value = {"columns": [{"name": "col1"}], "rows": [{"col1": "value1"}]}

            result = await render_item(1, ctx={"base_year": 2025})

            assert result["success"] is True
            assert result["has_base_year_placeholder"] is True

    @pytest.mark.asyncio
    async def test_has_base_year_placeholder_false(self):
        from app.services.item_renderer import render_item

        with patch("app.services.item_renderer.get_item", new_callable=AsyncMock) as mock_get_item, \
             patch("app.services.item_renderer.get_contents_master", new_callable=AsyncMock) as mock_get_master, \
             patch("app.services.item_renderer.get_contents_detail", new_callable=AsyncMock) as mock_get_detail, \
             patch("app.services.item_renderer.execute_sql_preview", new_callable=AsyncMock) as mock_exec_sql:

            mock_get_item.return_value = {
                "item_id": 1,
                "item_nm": "테스트 아이템",
                "shape_cnts_id": 1,
                "sql_cnts_id": 2,
                "mapping_json": {"type": "grid", "mapping": {"columns": [{"dataKey": "col1", "field": "col1"}]}}
            }

            mock_shape_master = MagicMock()
            mock_shape_master.cnts_tp = "grid"
            mock_get_master.side_effect = [
                mock_shape_master,
                MagicMock(user_sql="SELECT * FROM t")
            ]
            mock_get_detail.return_value = {"columns": [{"dataKey": "col1", "header": "컬럼1"}]}
            mock_exec_sql.return_value = {"columns": [{"name": "col1"}], "rows": [{"col1": "value1"}]}

            result = await render_item(1, ctx={"base_year": 2025})

            assert result["success"] is True
            assert result["has_base_year_placeholder"] is False

    @pytest.mark.asyncio
    async def test_has_base_year_placeholder_no_sql(self):
        from app.services.item_renderer import render_item

        with patch("app.services.item_renderer.get_item", new_callable=AsyncMock) as mock_get_item, \
             patch("app.services.item_renderer.get_contents_master", new_callable=AsyncMock) as mock_get_master, \
             patch("app.services.item_renderer.get_contents_detail", new_callable=AsyncMock) as mock_get_detail:

            mock_get_item.return_value = {
                "item_id": 1,
                "item_nm": "테스트 아이템",
                "shape_cnts_id": 1,
                "sql_cnts_id": None,
                "mapping_json": {"type": "grid", "mapping": {"columns": [{"dataKey": "col1", "field": "col1"}]}}
            }

            mock_shape_master = MagicMock()
            mock_shape_master.cnts_tp = "grid"
            mock_get_master.return_value = mock_shape_master
            mock_get_detail.return_value = {"columns": [{"dataKey": "col1", "header": "컬럼1"}]}

            result = await render_item(1, ctx={"base_year": 2025})

            assert result["success"] is True
            assert result["has_base_year_placeholder"] is False

    @pytest.mark.asyncio
    async def test_has_base_year_placeholder_with_error(self):
        from app.services.item_renderer import render_item

        with patch("app.services.item_renderer.get_item", new_callable=AsyncMock) as mock_get_item, \
             patch("app.services.item_renderer.get_contents_master", new_callable=AsyncMock) as mock_get_master, \
             patch("app.services.item_renderer.get_contents_detail", new_callable=AsyncMock) as mock_get_detail, \
             patch("app.services.item_renderer.execute_sql_preview", new_callable=AsyncMock) as mock_exec_sql:

            mock_get_item.return_value = {
                "item_id": 1,
                "item_nm": "테스트 아이템",
                "shape_cnts_id": 1,
                "sql_cnts_id": 2,
                "mapping_json": {"type": "grid", "mapping": {"columns": [{"dataKey": "col1", "field": "col1"}]}}
            }

            mock_shape_master = MagicMock()
            mock_shape_master.cnts_tp = "grid"
            mock_get_master.side_effect = [
                mock_shape_master,
                MagicMock(user_sql="SELECT * FROM t WHERE year = {{base_year}}")
            ]
            mock_get_detail.return_value = {"columns": [{"dataKey": "col1", "header": "컬럼1"}]}
            mock_exec_sql.side_effect = Exception("sql_execution_error: syntax error")

            result = await render_item(1, ctx={"base_year": 2025}, caller_roles=["SYS_ADM"])

            assert result["success"] is False
            assert result["has_base_year_placeholder"] is True
